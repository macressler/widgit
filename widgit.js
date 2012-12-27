function widgit( b )
{
  var t = { url: '', fullScreen: true };
  for( var k in t )
  {
    if( typeof b[ k ] == 'undefined' || b[ k ] == null ) b[ k ] = t[ k ];
  }
  if( b.fullScreen )
  {
    // to be replaced with ChildBrowser
    location = b.url
  }
    else
  {
    openURL( b.url );
  }
}

function openURL( url )
{
  if( window.widget )
  {
    // symbian
    window.widget.openURL( url );
  }
    else
  {
    var a = document.creatElement( 'a' );
    a.setAttribute( 'href', url );
    a.setAttribute( 'target', '_blank' );
    var dispatch = document.createEvent( 'HTMLEvents' );
    dispatch.initEvent( 'click', true, true );
    a.dispatchEvent( dispatch );    
  }
}