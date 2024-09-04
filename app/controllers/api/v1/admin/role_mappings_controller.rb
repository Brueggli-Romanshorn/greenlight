# BigBlueButton open source conferencing system - http://www.bigbluebutton.org/.
#
# Copyright (c) 2022 BigBlueButton Inc. and by respective authors (see below).
#
# This program is free software; you can redistribute it and/or modify it under the
# terms of the GNU Lesser General Public License as published by the Free Software
# Foundation; either version 3.0 of the License, or (at your option) any later
# version.
#
# Greenlight is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
# PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public License along
# with Greenlight; if not, see <http://www.gnu.org/licenses/>.

# frozen_string_literal: true

module Api
  module V1
    module Admin
      class RoleMappingsController < ApiController
        # before_action :set_role_mapping, only: [:update]

        def index
          @role_mappings = SettingGetter.new(setting_name: 'RoleMapping', provider: current_provider).call
          render_data data: @role_mappings, status: :ok
        end

        def set_role_mapping
          @role_mapping = SettingGetter.new(setting_name: 'RoleMapping', provider: current_provider).call
          rescue ActiveRecord::RecordNotFound
          render json: { error: 'Role mapping not found' }, status: :not_found
        end

        def role_mapping_params
          params.require(:role_mapping).permit(:value)
        end
      end
    end
  end
end
