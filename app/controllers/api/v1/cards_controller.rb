class Api::V1::CardsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_card, only: %i[destroy drag]

  # PUT /cards/:id/drag
  def drag
    @card.update(position: card_params[:position], list_id: card_params[:list_id])

    render json: { message: 'ok', card: @card, board_id: params[:board_id]}
  end

  # POST /cards
  def create
    @card = Card.new(name: card_params[:name], list_id: card_params[:list_id])
  
    if @card.save
      render json: @card, status: :created, location: api_v1_board_lists_path(@card)
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cards/1
  def destroy
    @card.destroy

    # TODO: no content means do not set delete message
    render json: { message: 'delete_ok' }, status: :no_content
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
