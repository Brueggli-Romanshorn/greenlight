# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '>= 3.3'

gem 'active_model_serializers', '>= 0.10.15'
gem 'active_storage_validations', '>= 1.3.4'
gem 'aws-sdk-s3', require: false
gem 'bcrypt', '~> 3.1.7'
gem 'bigbluebutton-api-ruby', '1.9.1'
gem 'bootsnap', require: false
gem 'clamby', '~> 1.6.10'
gem 'cssbundling-rails', '>= 1.3.3'
gem 'data_migrate', '>= 11.2'
gem 'dotenv-rails'
gem 'google-cloud-storage', '~> 1.44', require: false
gem 'hcaptcha'
gem 'i18n-language-mapping'
gem 'image_processing', '~> 1.2'
gem 'jbuilder', '>= 2.12'
gem 'jsbundling-rails', '>= 1.2.2'
gem 'jwt'
gem 'mini_magick', '>= 4.9.5'
gem 'nkf', '~> 0.2.0'
gem 'omniauth', '~> 2.1.2'
gem 'omniauth_openid_connect', '>= 0.6.1'
gem 'omniauth-rails_csrf_protection', '~> 1.0.2'
gem 'pagy', '~> 6.0', '>= 6.0.0'
gem 'pg'
gem 'puma', '~> 6.4'
gem 'rails', '~> 7.2.2'
gem 'redis', '~> 4.8.0'
gem 'sprockets-rails', '>= 3.5.0'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

group :development, :test do
  gem 'debug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  gem 'rubocop', '~> 1.26', require: false
  gem 'rubocop-capybara', '~> 2.19.0', require: false
  gem 'rubocop-factory_bot', '~> 2.24.0', require: false
  gem 'rubocop-performance', '~> 1.13', require: false
  gem 'rubocop-rails', '~> 2.18', '>= 2.18.0', require: false
  gem 'rubocop-rspec', '~> 2.9.0', require: false
  gem 'web-console', '>= 4.2.1'
end

group :test do
  gem 'capybara'
  gem 'factory_bot', '>= 6.4.1'
  gem 'factory_bot_rails', '>= 6.4.3'
  gem 'faker'
  gem 'rspec-rails', '~> 7.1'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers', '~> 5.0'
  gem 'webdrivers'
  gem 'webmock', '>= 3.23.1'
end

group :production do
  gem 'lograge', '~> 0.14.0'
  gem 'remote_syslog_logger'
end
