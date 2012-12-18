function widgit( bm )
{
  var tpl = { url: '', fullScreen: true };
  for( var k in tpl )
  {
    if( typeof bm[ k ] == 'undefined' || bm[ k ] == null ) bm[ k ] = tpl[ k ];
  }
  if( bm.fullScreen ) location = bm.url
}