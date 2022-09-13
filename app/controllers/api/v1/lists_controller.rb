class Api::V1::ListsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_list, only: %i[ show edit update destroy drag]

  # GET /lists
  def index
    board = Board.find(params[:board_id])
    lists_json = board.lists_json
    render json: { message: 'ok', lists: lists_json, board_id: params[:board_id] }
  end

  # PUT /lists/:id/drag
  def drag
    @list.insert_at(list_params[:position].to_i)

    render json: { message: 'ok', list: @list, board_id: params[:board_id]}
  end

  # POST /lists
  def create
    @list = List.new(name: list_params[:name], board_id: params[:board_id])

    if @list.save
      render json: @list, status: :created, location: api_v1_board_lists_path(@list)
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lists/1
  def destroy
    @list.destroy

    render json: {message: 'delete_ok'}, status: :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_list
      @list = List.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def list_params
      params.require(:list).permit(:name, :board_id, :position)
    end
end
