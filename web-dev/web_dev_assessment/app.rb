require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/content_for'
require 'tilt/erubis'

configure do
  enable :sessions
  set :sessions_secret, 'secret'
  set :purchases, []
end

def missing_inputs(fields)
  fields.map do |string|
    string.split("_").map(&:capitalize).join(" ")
  end
        .join(", ")
end

def invalid_card_info?(card_number)
  !!card_number.match(/[^0-9]+/i) || card_number.size != 16
end

def mask_card_number(card_number)
  first_four = [card_number[0..3]]
  append = ["****"] * 3
  (first_four + append).join('-')
end

def add_payment_record(name, created, card_number, expiration_date)
  new_record = { "purchase_name" => name, "purchase_created" => created,
                 "purchase_card" => card_number, "purchase_expiry" => expiration_date
               }
  settings.purchases << new_record
end

def invalid_input?(params)
  errors = []

  if params.values.any? { |value| value == "" }
    blank_inputs = params.select { |_, v| v == "" }
    errors << "Inputs missing: #{ missing_inputs(blank_inputs.keys) }"
  end

  if invalid_card_info?(params[:card_number])
    errors << "Invalid card number: Card number must be 16 digits long."
  end

  return if errors.empty?
  session[:message] = errors.join("<br/>")
  status 422
  redirect "/new"
end

get "/" do
  redirect "/payments"
end

get "/payments" do
  erb :payments
end

get "/new" do
  erb :new
end

post "/payments/create" do
  unless invalid_input?(params)
    name = params[:first_name] + ' ' + params[:last_name]
    created = Time.now
    card_number = mask_card_number(params[:card_number])
    expiration_date = params[:expiration_date]

    add_payment_record(name, created, card_number, expiration_date)
    session[:message] = "Thank you for your payment."
    redirect "/"
  end
end
