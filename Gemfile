source 'https://rubygems.org'

# PostgreSQL driver
gem 'pg'

# Sinatra driver
gem 'sinatra'
gem 'sinatra-contrib'

gem 'activesupport', '~>4.1'
gem 'activerecord', '~>4.1'
gem 'bcrypt-ruby'

gem 'rake'

gem 'shotgun'

group :test do
  gem 'shoulda-matchers'
  gem 'rack-test'
  gem 'rspec'
  gem 'capybara'
end

group :development do
  gem "rack-livereload"
  gem "guard-livereload"
end

group :test, :development do
  gem 'factory_girl'
  gem 'faker'
end
