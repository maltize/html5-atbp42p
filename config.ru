gem 'rack', '~> 1.4.0'

require 'rubygems'
require 'rack'

use Rack::Static, :urls => ["/scripts"]

map "/mini" do
  run lambda { |env|
    [
      200,
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('atbp42p-drug.html', File::RDONLY)
    ]
  }
end

map "/" do
  run lambda { |env|
    [
      200,
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('atbp42p.html', File::RDONLY)
    ]
  }
end
