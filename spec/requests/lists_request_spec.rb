require 'rails_helper'
include ActionController::RespondWith
RSpec.describe 'Lists', type: :request do
  let(:user) { FactoryBot.create(:user, password: 'password') }
  let(:board) { FactoryBot.create(:board, user_id: user.id) }
  let(:list1) { FactoryBot.create(:list, board_id: board.id) }
  let(:list2) { FactoryBot.create(:list, board_id: board.id) }

  before do
    login(user)
    @auth_params = get_auth_params_from_login_response_headers(response)
  end

  describe 'GET /index' do 
    before do
      FactoryBot.create_list(:card, 10, list_id: list1.id)
      FactoryBot.create_list(:card, 7, list_id: list2.id)
      get "/api/v1/boards/#{board.id}/lists", headers: @auth_params
    end

    it 'returns all lists of the board' do
      expect(json["lists"].size).to eq(2)
    end

    it 'returns all cards belongs to list1' do
      expect(json["lists"][0]["id"]).to eq(list1.id)
      expect(json["lists"][0]["cards"].size).to eq(10)
    end

    it 'returns all cards belongs to list2' do
      expect(json["lists"][1]["id"]).to eq(list2.id)
      expect(json["lists"][1]["cards"].size).to eq(7)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST /create' do 
    before do
      params = { list: {name: 'list name', board_id: board.id}}
      post "/api/v1/boards/#{board.id}/lists", params: params, headers: @auth_params
    end

    it 'returns created list' do
      expect(json['name']).to eq('list name')
      expect(json['board_id']).to eq(board.id)
    end

    it 'returns a created status' do
      expect(response).to have_http_status(:created)
    end
  end

  describe 'PUT /drag' do

    before do
      FactoryBot.create_list(:list, 10, board_id: board.id)
      params = { list: {position: 3}}
      put "/api/v1/boards/#{board.id}/lists/#{list1.id}/drag", params: params, headers: @auth_params
    end

    it 'returns updated list' do
      expect(json['list']['id']).to eq(list1.id)
      expect(json['list']['position']).to eq(3)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'DELETE /destroy' do 
    before do
      delete "/api/v1/boards/#{board.id}/lists/#{list2.id}", headers: @auth_params
    end

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end