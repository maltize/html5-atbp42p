use Rack::Static, :urls => ["/scripts"]

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
