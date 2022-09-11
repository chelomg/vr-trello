require 'rails_helper'
include ActionController::RespondWith
RSpec.describe 'Boards', type: :request do
  let(:user) { FactoryBot.create(:user, password: 'password') }

  before do
    login(user)
    @auth_params = get_auth_params_from_login_response_headers(response)
  end

  describe 'GET /index' do 
    before do
      FactoryBot.create_list(:board, 10, user_id: user.id)
      get '/api/v1/boards', headers: @auth_params
    end

    it 'returns all boards of user' do
      expect(json["boards"].size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create' do 
    before do
      params = { board: {name: 'board name', description: 'board description'}}
      post '/api/v1/boards', params: params, headers: @auth_params
    end

    it 'returns the name' do
      expect(json['name']).to eq('board name')
    end

    it 'returns the description' do
      expect(json['description']).to eq('board description')
    end

    it 'returns a created status' do
      expect(response).to have_http_status(:created)
    end
  end

  describe 'DELETE /destroy' do 
    let!(:board) { FactoryBot.create(:board, user_id: user.id) }

    before do
      delete "/api/v1/boards/#{board.id}", headers: @auth_params
    end

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end