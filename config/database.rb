# Log queries to STDOUT in development
if Sinatra::Application.development?
  ActiveRecord::Base.logger = Logger.new(STDOUT)
end

#Load from the APP's app/models folder all models
#Prevent from inheritence based exceptions on class definitions i.e. if a child is required before its parent
Dir[APP_ROOT.join('app', 'models', '*.rb')].each do |model_file|
  filename = File.basename(model_file).gsub('.rb', '')
  autoload ActiveSupport::Inflector.camelize(filename), model_file
end

# Heroku controls what database we connect to by setting the DATABASE_URL environment variable
# We need to respect that if we want our Sinatra apps to run on Heroku without modification
db = URI.parse(ENV['DATABASE_URL'] || "postgres://localhost/#{APP_NAME}_#{Sinatra::Application.environment}")

DB_NAME = db.path[1..-1]