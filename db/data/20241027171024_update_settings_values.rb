class UpdateSettingsValues < ActiveRecord::Migration[7.1]
  def change
      privp_setting = SiteSetting.joins(:setting).find_by( provider: 'greenlight', setting: { name: 'PrivacyPolicy' })
      terms_setting = SiteSetting.joins(:setting).find_by( provider: 'greenlight', setting: { name: 'Terms' })
          
      unless privp_setting.value === 'true' || privp_setting.value === 'false'
        privp_setting.value === "" ? privp_setting.update(value: 'false') : privp_setting.update(value: 'true')
      end

      unless terms_setting.value === 'true' || terms_setting.value === 'false'
        terms_setting.value === "" ? terms_setting.update(value: 'false') : terms_setting.update(value: 'true')
      end


      Tenant.all.each do |tenant|
        SiteSetting.joins(:setting).find_by( provider: tenant.name, setting: { name: 'PrivacyPolicy' }).update(value: 'false')
        SiteSetting.joins(:setting).find_by( provider: tenant.name, setting: { name: 'Terms' }).update(value: 'false')
      end
      
  end
end
