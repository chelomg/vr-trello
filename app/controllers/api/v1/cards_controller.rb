class Api::V1::CardsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_card, only: %i[drag]

  # PUT /cards/:id/drag
  def drag
    @card.update(position: params[:position], list_id: params[:list_id])

    render json: { message: 'ok', card: @card, board_id: params[:board_id]}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      @card = Card.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def card_params
      params.require(:card).permit(:name, :id, :position, :board_id, :list_id)
    end
end
