require "rails_helper"
include ActionController::RespondWith
RSpec.describe 'authentication test', type: :request do
  let(:user) { FactoryBot.create(:user, email: 'test@example.com', password: 'password') }

  context 'before login' do
    it "returns 401 if you don't login" do
      get '/api/v1/boards'
      expect(response).to have_http_status(401)
    end

    before do
      login(user)
    end

    it 'get an authentication token if you are an existing user and correct password' do
      expect(response.has_header?('access-token')).to eq(true)
    end

    it 'get status 200 if you are an existing user and correct password' do
      expect(response).to have_http_status(200)
    end
  end

  context 'after login' do
    before do
      login(user)
      @auth_params = get_auth_params_from_login_response_headers(response)
      @fake_params = {
        'access-token' => 'fake token'
      }
    end

    it 'pass restrict api with valid token' do
      get '/api/v1/boards', headers: @auth_params
      expect(response).to have_http_status(200)
    end

    it 'get acccess deny with unvalid token' do
      get '/api/v1/boards', headers: @fake_params
      expect(response).to have_http_status(401)
    end
  end
end