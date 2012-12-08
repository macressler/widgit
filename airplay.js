function xhr( method, url, data, callback )
{
  var req = null;
  if( window.XMLHttpRequest ) req = new XMLHttpRequest();
  if( window.ActiveXObject )
  {
    var names = [ 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP' ];
    for( var i in names )
    {
      try{ req = ActiveXObject( names[ i ] ); break; }
      catch( e ) { }
    }
  }
  if( req == null )
  {
    alert( 'Browser not supported' );
    return;
  }
  req.onreadystatechange = function() { callback( req ) };
  req.open( method, url, true );
  if( method == 'GET' ) req.overrideMimeType( 'text/plain; charset=x-user-defined' );
  if( method == 'POST' ) req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
  req.send( data );
}

function airplayPhoto( photo )
{
  xhr
  (
    'GET',
    photo,
    null,
    function( r )
    {
      if( r.readyState == 4 )
      {
        var data = r.responseText;
        document.getElementById( 'photo' ).src = 'data:image/jpeg;base64,' + base64encode( data );
        airplayPhotoData( data );
      }
    }
  );
}

function airplayPhotoData( data )
{
  var a = new ArrayBuffer( data.length );
  var ui8a = new Uint8Array( a, 0 );
  for( var i = 0; i < data.length; i++ ) ui8a[ i ] = ( data.charCodeAt( i ) & 0xff );
  xhr
  (
    'PUT',
    'http://appletv.local:7000/photo',
    //'test0.jpg',
    a,
    function( r )
    {
      if( r.readyState == 4 )
      {
        alert( 'Done!' );
      }
    }
  );
}

function airplayURL( url )
{
  var f = document.createElement( 'link' );
  f.href = url;
  xhr( 'GET', url, null, function( r )
  {
    if( r.readyState == 4 )
    {
      var e = r.responseText;
      var a = document.createElement( 'iframe' );
      $( a ).css( { visibility: "hidden" } ).width( $( window ).width() ).height( $( window ).height() );
      $( '#content' ).empty().append( a );
      b = a.contentWindow.document;
      b.open();
      $( a.contentWindow ).load
      (
        function()
        {
          var g = $( a ).contents().find( 'body' );
          var h =
          {
            onrendered: function( j )
            {
              $( '#content' ).empty().append( j );
              $( 'base' ).attr( 'href', '' );
              $( '#content' ).find( 'canvas' ).first().attr( 'id', 'capture' );
              var dataURI = top.document.getElementById( 'capture' ).toDataURL( 'image/jpeg' );
              var data = dataURI.substring( dataURI.indexOf( ',' ) + 1 );
              airplayPhotoData( base64decode( data ) );
            },
            width: 1024,
            height: 768,
          }
          var i = html2canvas( g, h );
        }
      );
      $( 'base' ).attr( 'href', f.protocol + '//' + f.hostname + '/' + f.pathname );
      e = e.replace( '<head>', '<head><base href=\'' + f.protocol + '//' + f.hostname + '/' + f.pathname + '\' />' );
      e = e.replace( /\<script/gi, '<!--<script' );
      e = e.replace( /\<\/script\>/gi, '<\/script>-->' );
      b.write( e );
      b.close();
    }
  });
}
