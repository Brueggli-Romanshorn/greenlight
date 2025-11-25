class AddImprintSettingsValues < ActiveRecord::Migration[7.2]
  def up
    Setting.find_or_create_by(name: 'Imprint')
    Setting.find_or_create_by(name: 'ImprintText')

    SiteSetting.create(setting: Setting.find_by(name: 'Imprint'), value: 'false', provider: 'greenlight') unless SiteSetting.exists?(setting: Setting.find_by(name: 'Imprint'), provider: 'greenlight')
    SiteSetting.create(setting: Setting.find_by(name: 'ImprintText'), value: '[{"type":"paragraph","children":[{"text":""}]}]', provider: 'greenlight') unless SiteSetting.exists?(setting: Setting.find_by(name: 'ImprintText'), provider: 'greenlight')

    Tenant.all.each do |tenant|
      SiteSetting.create(setting: Setting.find_by(name: 'Imprint'), value: 'false', provider: tenant.name) unless SiteSetting.exists?(setting: Setting.find_by(name: 'Imprint'), provider: tenant.name)
      SiteSetting.create(setting: Setting.find_by(name: 'ImprintText'), value: '', provider: tenant.name) unless SiteSetting.exists?(setting: Setting.find_by(name: 'ImprintText'), provider: tenant.name)
    end
  end

  def down
    Tenant.all.each do |tenant|
      SiteSetting.find_by(setting: Setting.find_by(name: 'Imprint'), provider: tenant.name).destroy
      SiteSetting.find_by(setting: Setting.find_by(name: 'ImprintText'), provider: tenant.name).destroy
    end

    SiteSetting.find_by(setting: Setting.find_by(name: 'Imprint'), provider: 'greenlight').destroy
    SiteSetting.find_by(setting: Setting.find_by(name: 'ImprintText'), provider: 'greenlight').destroy

    Setting.find_by(name: 'Imprint')&.destroy
    Setting.find_by(name: 'ImprintText')&.destroy
  end
end
