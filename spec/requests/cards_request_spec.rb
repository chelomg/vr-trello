require 'rails_helper'
include ActionController::RespondWith
RSpec.describe 'Cards', type: :request do
  let(:user) { FactoryBot.create(:user, password: 'password') }
  let(:board) { FactoryBot.create(:board, user_id: user.id) }
  let(:list) { FactoryBot.create(:list, board_id: board.id) }
  let(:card) { FactoryBot.create(:card, list_id: list.id) }

  before do
    login(user)
    @auth_params = get_auth_params_from_login_response_headers(response)
  end

  describe 'POST /create' do 
    before do
      params = { card: {name: 'card name', list_id: list.id}}
      post "/api/v1/boards/#{board.id}/cards", params: params, headers: @auth_params
    end

    it 'returns created card' do
      expect(json['list_id']).to eq(list.id)
      expect(json['name']).to eq('card name')
    end

    it 'returns a created status' do
      expect(response).to have_http_status(:created)
    end
  end

  describe 'PUT /drag' do
    before do
      FactoryBot.create_list(:card, 10, list_id: list.id)
      params = { card: {position: 7}}
      put "/api/v1/boards/#{board.id}/cards/#{card.id}/drag", params: params, headers: @auth_params
    end

    it 'returns draged card' do
      expect(json['card']['id']).to eq(card.id)
      expect(json['card']['position']).to eq(7)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'DELETE /destroy' do 
    before do
      delete "/api/v1/boards/#{board.id}/cards/#{card.id}", headers: @auth_params
    end

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end