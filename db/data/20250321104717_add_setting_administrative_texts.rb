class AddSettingAdministrativeTexts < ActiveRecord::Migration[7.2]
  def up
    Setting.find_or_create_by(name: 'TermsText')
    Setting.find_or_create_by(name: 'PrivacyText')

    SiteSetting.create(setting: Setting.find_by(name: 'TermsText'), value: '[{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]}]', provider: 'greenlight') unless SiteSetting.exists?(setting: Setting.find_by(name: 'TermsText'), provider: 'greenlight')
    SiteSetting.create(setting: Setting.find_by(name: 'PrivacyText'), value: '[{\"type\":\"paragraph\",\"children\":[{\"text\":\"\"}]}]', provider: 'greenlight') unless SiteSetting.exists?(setting: Setting.find_by(name: 'PrivacyText'), provider: 'greenlight')

    Tenant.all.each do |tenant|
      SiteSetting.create(setting: Setting.find_by(name: 'TermsText'), value: '', provider: tenant.name) unless SiteSetting.exists?(setting: Setting.find_by(name: 'TermsText'), provider: tenant.name)
      SiteSetting.create(setting: Setting.find_by(name: 'PrivacyText'), value: '', provider: tenant.name) unless SiteSetting.exists?(setting: Setting.find_by(name: 'PrivacyText'), provider: tenant.name)
    end
  end

  def down
    Tenant.all.each do |tenant|
      SiteSetting.find_by(setting: Setting.find_by(name: 'TermsText'), provider: tenant.name).destroy
      SiteSetting.find_by(setting: Setting.find_by(name: 'PrivacyText'), provider: tenant.name).destroy
    end

    SiteSetting.find_by(setting: Setting.find_by(name: 'TermsText'), provider: 'greenlight').destroy
    SiteSetting.find_by(setting: Setting.find_by(name: 'PrivacyText'), provider: 'greenlight').destroy

    Setting.find_by(name: 'TermsText')&.destroy
    Setting.find_by(name: 'PrivacyText')&.destroy
  end
end
