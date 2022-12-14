class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorized_user

  rescue_from ActiveRecord::RecordInvalid, with: :render_uprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found


  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end

  def authorized_user  
    return render json: { error: "Not authorized" }, status: :unauthorized unless current_user
  end

  private

  def render_uprocessable_entity
    render json: {errors: invalid.record.errors}, status: :unprocessable_entity
  end

  def render_not_found(error)
    render json: {errors: {error.model => "Not Found"}}, status: :not_found
  end
end
