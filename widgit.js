function widgit( b )
{
  var t = { url: '', fullScreen: true };
  for( var k in t )
  {
    if( typeof b[ k ] == 'undefined' || b[ k ] == null ) b[ k ] = t[ k ];
  }
  if( b.fullScreen ) location = b.url
}