

var beerdb_widget_new = function( widget_id, tpl_id, api_path_prefix ) {
  
  // todo: use options
  //   make api_path_prefix into an option
  //
  // that is, use defaults
  
  var _api_path_prefix = '';
  var _$widget;
  var _tpl;
  
  function _init( widget_id, tpl_id, api_path_prefix )
  {
    _api_path_prefix = api_path_prefix;
    _$widget   = $( widget_id );
    // fix: just returns a string!!!
    _tpl      = $( tpl_id ).html();   // todo: check if it returns jquery object or just plain js{    
  }

  
  function _fetch_beer( key, onsuccess )
  {
    var api_link = _api_path_prefix + "/beer/" + key + "?callback=?"; 
    $.getJSON( api_link, onsuccess );
  }

  function _fetch_brewery( key, onsuccess )
  {
    var api_link = _api_path_prefix + "/brewery/" + key + "?callback=?"; 
    $.getJSON( api_link, onsuccess );
  }

  function _update( key )
  {
    _fetch_brewery( key, function( json ) {
    
        var snippet = _.template( _tpl, { data: json } );
        _$widget.html( snippet );

    }); 
  }  // fn _update

  // call "c'tor/constructor"
  _init( widget_id, tpl_id, api_path_prefix );

  // return/export public api
  return {
     update: _update
  }
} // fn beerdb_widget_new
