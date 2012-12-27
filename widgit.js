function init( b, auto )
{
  document.getElementById( 'button' ).innerHTML = b[ 'name' ];
  if( auto ) widgit( b );
}

function widgit( b )
{
  var t = { name: '', url: '', fullScreen: false };
  for( var k in t )
  {
    if( typeof b[ k ] == 'undefined' || b[ k ] == null ) b[ k ] = t[ k ];
  }
  if( b.fullScreen )
  {
    if( window.plugins && window.plugins.childBrowser )
    {
      window.plugins.childBrowser.showWebPage( b.url );
    }
      else
    {
      location = b.url;
    }
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
    var a = document.createElement( 'a' );
    a.setAttribute( 'href', url );
    a.setAttribute( 'target', '_blank' );
    var e = document.createEvent( 'HTMLEvents' );
    e.initEvent( 'click', true, true );
    a.dispatchEvent( e );    
  }
}