class Api::V1::BoardsController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_board, only: %i[ update destroy ]

  # GET /boards
  def index
    boards = current_api_v1_user.boards
    user_id = current_api_v1_user.uid
    render json: { message: 'ok', boards: boards, user_id: user_id }
  end

  # POST /boards
  def create
    @board = Board.new(name: board_params[:name], description: board_params[:description], user_id: current_api_v1_user.id)
    if @board.save
      render json: @board, status: :created, location: api_v1_boards_path(@board)
    else
      render json: @board.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /boards/1
  def update
    respond_to do |format|
      if @board.update(board_params)
        format.html { redirect_to board_url(@board), notice: "Board was successfully updated." }
        format.json { render :show, status: :ok, location: @board }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /boards/1
  def destroy
    @board.destroy

    render json: { message: 'delete success' }, status: :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_board
      @board = Board.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def board_params
      params.require(:board).permit(:name, :description, :user_id, :uid, :access_token, :client)
    end
end
