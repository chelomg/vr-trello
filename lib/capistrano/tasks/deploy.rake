namespace :deploy do
  desc 'Runs webpacker compile on the app servers'
  task :assets_precompile do
    on roles(:app) do
      within current_path do
        with rails_env: fetch(:rails_env) do
          execute :bundle, "exec rake assets:precompile"
        end
      end
    end
  end
  
  desc 'Runs install js plugin as "vue-cli-service build" bug'
  task :build_js_plugin do
    on roles(:app) do
      # current_path is "cd ~" our project path is "cd ~/[your app name]/current/"
      within current_path do
        with node_env: fetch(:node_env) do
          cmd = [
            "cd staging/current/",
            "yarn add @vue/cli-plugin-babel",
            "yarn build"
          ].join(" && ")
          execute cmd
        end
      end
    end
  end
end