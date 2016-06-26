require "json"
require "sinatra"
require "octokit"

class MagnumCIGitHubIntegration < Sinatra::Base
  post "/post_event/:github_token" do |github_token|
    @payload = JSON.parse(params[:payload])
    @github = Octokit::Client.new(access_token: github_token)
    
    repo = (@payload["commit_url"] =~ %r(github\.com/(.+?/.+?)/) and $1)
    status = case @payload["status"]
             when "pass" then "success"
             when "fail" then "failure"
             end
    
    @github.create_status(repo, @payload["commit"], status,
      accept: "application/vnd.github.she-hulk-preview+json",
      context: "continuous-integration/magnum-ci",
      description: @payload["title"],
      target_url: @payload["build_url"]
    )
  end
end