class AddBoolNewUserNotification < ActiveRecord::Migration[7.2]
  def up
    Setting.find_or_create_by(name: 'NewUserNotification')

    SiteSetting.create(setting: Setting.find_by(name: 'NewUserNotification'), value: 'false', provider: 'greenlight') unless SiteSetting.exists?(setting: Setting.find_by(name: 'NewUserNotification'), provider: 'greenlight')

    Tenant.all.each do |tenant|
      SiteSetting.create(setting: Setting.find_by(name: 'NewUserNotification'), value: 'false', provider: tenant.name) unless SiteSetting.exists?(setting: Setting.find_by(name: 'NewUserNotification'), provider: tenant.name)
    end
  end

  def down
    Tenant.all.each do |tenant|
      SiteSetting.find_by(setting: Setting.find_by(name: 'NewUserNotification'), provider: tenant.name).destroy
    end

    SiteSetting.find_by(setting: Setting.find_by(name: 'NewUserNotification'), provider: 'greenlight').destroy
	
    Setting.find_by(name: 'NewUserNotification')&.destroy
  end
end
