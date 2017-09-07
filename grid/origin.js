'use strict';
function select( selector ){
  return document.querySelectorAll( selector );
}

function createLabels( e ){
  var parent = document.querySelector( e ),
      i = 0,
      val = 18,
      label = 10;
  
  for( i = 0; i < 10; i++ ){
    if( e === '.h-num' ){
      parent.innerHTML += 
        '<text alignment-baseline="start" text-anchor="middle" x="' + 
          val + '" y="9.5">' + label + '</text>' + '\n';   
    }
    else if( e === '.v-num' ){
      parent.innerHTML += 
        '<text alignment-baseline="middle" text-anchor="end" y="' +
          val + '" x="9.5">' + label + '</text>' + '\n';     
    }
    
    val = val + 8; label = label + 10;
  }
}

function createLines( e ){
  var parent = document.querySelectorAll( e ),
      i = 0, j = 0,
      val = 18;
  
  for( i = 0; i < 10; i++ ){
    if( val !== 50 ){
      if( e === '.h-lns' ){
        for( j = 0; j < parent.length; j++ ){
          parent[ j ].innerHTML += 
            '<line x1="9.5" x2="90" y1="' +  val + '" y2=" ' + val + '" />' +
            '\n';  
        } 
      }
      else if( e === '.v-lns' ){
        for( j = 0; j < parent.length; j++ ){        
          parent[ j ].innerHTML += 
            '<line y1="9.5" y2="90" x1="' +  val + '" x2=" ' + val + '" />' +
            '\n';         
        }      
      }
    }
    
    val = val + 8;
  }
}

function recalLoop( variable, string ) {
  var i = 0, val = 0;
  
  for( i = 0; i < variable.length; i++ ){
    val = variable[ i ].getAttribute( string );
    val = Number( val ) * 0.8 + 10;
    variable[ i ].setAttribute( string, val );
  } 
}

function recalibrate(){
  var x = select( '.drawing [ x ]' ), y = select( '.drawing [ y ]' ),
    x1 = select( '.drawing [ x1 ]' ), y1 = select( '.drawing [ y1 ]' ),
    x2 = select( '.drawing [ x2 ]' ), y2 = select( '.drawing [ y2 ]' ),
    cx = select( '.drawing [ cx ]' ), cy = select( '.drawing [ cy ]' ),
    points = select( '.drawing [ points ]' ), d = select( '.drawing [ d ]' ),
    i = 0, j = 0, k = 0, val = 0,
    firstChar = '', 
    firstCharSub = '', firstCharSub2 = '', firstCharSub3 = '', num = 0,
    subIdx = 0, subIdx2 = 0, subIdx3 = 0;
  
  recalLoop( x, 'x' ); recalLoop( y, 'y' );
  recalLoop( x1, 'x1' ); recalLoop( y1, 'y1' );
  recalLoop( x2, 'x2' ); recalLoop( y2, 'y2' );
  recalLoop( cx, 'cx' ); recalLoop( cy, 'cy' );
  
  for( i = 0; i < points.length; i++ ){
    val = points[ i ].getAttribute( 'points' );
    val = val.split( '\n' ); val.shift();
    
    for( j = 0; j < val.length; j++ ){
      val[ j ] = val[ j ].replace( / /g, '' );
      val[ j ] = val[ j ].replace( ',', ' ' );
    }
    
    val.pop();
    
    for( j = 0; j < val.length; j++ ){
      val[ j ] = val[ j ].split( ' ' );
    }
    
    for( j = 0; j < val.length; j++ ){
      for( k = 0; k < val[ j ].length; k++ ){
        val[ j ][ k ] = Number( val[ j ][ k ] ) * 0.8 + 10;
      }
    }
    
    val = val.join( ' ' );
    points[ i ].setAttribute( 'points', val );
  }
  
  
  for( i = 0; i < d.length; i++ ){
    val = d[ i ].getAttribute( 'd' );
    val = val.split( '\n' ); val.shift();
    
    for( j = 0; j < val.length; j++ ){
      val[ j ] = val[ j ].replace( / /g, '' );
      val[ j ] = val[ j ].replace( ',', ' ' );
      val[ j ] = val[ j ].trim();
    }
    val.pop();

    
    for( j = val.length - 1; j >= 0; j-- ){
      if( val[ j ].slice( 0, 1 ) === 'C' ){
        val[ j ] = val[ j ] + ', ' + val[ j + 1 ] + ', ' + val[ j + 2 ];
        val.splice( ( j + 1 ), 2 );
      }
      if( val[ j ].slice( 0, 1 ) === 'S' || val[ j ].slice( 0, 1 ) === 'Q' ){
        val[ j ] = val[ j ] + ', ' + val[ j + 1 ];
        val.splice( ( j + 1 ), 1 );
      }  
      if( val[ j ].slice( 0, 1 ) === 'A' ){
        val[ j ] = val[ j ] + ', ' + val[ j + 1 ] + ', ' + val[ j + 2 ] +
          ', ' + val[ j + 3 ];
        val.splice( ( j + 1 ), 3 );
      }      
    }

    for( j = 0; j < val.length; j++ ){
      val[ j ] = val[ j ].split( ' ' );
    }    
    
    for( j = 0; j < val.length; j++ ){
      for( k = 0; k < val[ j ].length; k++ ){
        firstChar = val[ j ][ k ].toString().slice( 0, 1 );
        
        if( firstChar === 'M' || firstChar === 'L' || firstChar === 'T' ){
          num = val[ j ][ 0 ].slice( 1, 100 );
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 0 ] = firstChar + num;
          
          num = val[ j ][ 1 ];
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 1 ] = num + '\n';          
        }
        if( firstChar === 'C' ){       
          num = val[ j ][ 0 ].slice( 1, 100 );
          num = Number( num ) * 0.8 + 10;          
          val[ j ][ 0 ] = firstChar + num;
          
          num = val[ j ][ 1 ];
          num = num.replace( ',', '' );
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 1 ] = num + ',';     
          
          num = val[ j ][ 2 ];
          num = num.replace( ',', '' );
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 2 ] = num + ',';   
          
          num = val[ j ][ 3 ];
          num = num.replace( ',', '' );
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 3 ] = num + ',';       
          
          num = val[ j ][ 4 ];
          num = num.replace( ',', '' );
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 4 ] = num + ',';  
          
          num = val[ j ][ 5 ];
          num = num.replace( ',', '' );
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 5 ] = num + '\n'; 
        }
        if( firstChar === 'S' || firstChar === 'Q' ){       
          num = val[ j ][ 0 ].slice( 1, 100 );
          num = Number( num ) * 0.8 + 10;          
          val[ j ][ 0 ] = firstChar + num;
          
          num = val[ j ][ 1 ];
          num = num.replace( ',', '' );
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 1 ] = num + ',';     
          
          num = val[ j ][ 2 ];
          num = num.replace( ',', '' );
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 2 ] = num + ',';   
          
          num = val[ j ][ 3 ];
          num = num.replace( ',', '' );
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 3 ] = num + '\n';      
        }
        if( firstChar === 'A' ){       
          num = val[ j ][ 5 ];
          num = num.replace( ',', '' );
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 5 ] = num + ',';   
          
          num = val[ j ][ 6 ];
          num = num.replace( ',', '' );
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 6 ] = num + '\n';       
        }
        if( firstChar === 'H' || firstChar === 'V' ){
          num = val[ j ][ 0 ].slice( 1, 100 );
          num = Number( num ) * 0.8 + 10;
          val[ j ][ 0 ] = firstChar + num + '\n';          
        }        
      }         
    }            
    
    val[ 0 ][ 0 ] = '\n' + val[ 0 ][ 0 ];       
    
    val = val.toString();
    val = val.replace( /,,/g, ',' );

    d[ i ].setAttribute( 'd', val );
  }    
}

function zmOnPt( x, y, zoom ){
  var grid = document.getElementById( 'grid' ),
      halfDimnX = 0, halfDimnY = 0,
      xPos = 0, yPos = 0,
      newViewBox = 0;
  
  x = x * 0.8 + 10; y = y * 0.8 + 10;
  halfDimnX = ( zoom / 2 ); xPos = ( x - halfDimnX  ).toString() + ' ';
  halfDimnY = ( zoom / 2 ); yPos = ( y - halfDimnY  ).toString() + ' ';
  
  xPos = ( x - halfDimnX  ).toString() + ' ';
  yPos = ( y - halfDimnY  ).toString() + ' ';
  
  newViewBox = xPos + yPos + zoom + ' ' + zoom;

  grid.setAttribute( 'viewBox', newViewBox );
}

function getCoords( evt ){
  var grid = document.getElementById( 'grid' ),
      pt = grid.createSVGPoint();
  
  pt.x = evt.clientX; pt.y = evt.clientY;
  return pt.matrixTransform( grid.getScreenCTM().inverse() );
}

function zoom( evt ) {
  var loc = getCoords( evt ),
      grid = document.getElementById( 'grid' ),
      viewBoxAttr = grid.getAttribute( 'viewBox' ),
      viewBoxAry = viewBoxAttr.split( ' ' ),
      oldX = parseFloat( viewBoxAry[ 0 ] ),
      oldY = parseFloat(viewBoxAry[1]),
      oldWidth = parseFloat(viewBoxAry[2]),
      oldHeight = parseFloat(viewBoxAry[3]),
      newWidth = oldWidth / 2,  // Halving the view width => zoom X2
      newHeight = oldHeight / 2,
      newX = loc.x - newWidth / 2,
      newY = loc.y - newHeight / 2,
      animProgress = 0,   // Goes from 0 to 1
      animStep = 0.02,  // Change in animProgress per interval function invocation.

      interval = setInterval( function() {
        animProgress += animStep;
        if ( animProgress > 1 )
        animProgress = 1;
        // Calculate a new viewBox corresponding to out animation progress
        var nextViewBox = [
          oldX + animProgress * ( newX - oldX ),
          oldY + animProgress * ( newY - oldY ),
          oldWidth + animProgress * ( newWidth - oldWidth ),
          oldHeight + animProgress * ( newHeight - oldHeight )
        ];
        grid.setAttribute( "viewBox", nextViewBox.join( ' ' ) );
        if ( animProgress >= 1 )
        clearInterval( interval );
    }, 10 );
}



var grid = document.getElementById( 'grid' );
grid.addEventListener( 'dblclick', zoom );

createLines( '.h-lns' ); createLines( '.v-lns' );
createLabels( '.h-num' ); createLabels( '.v-num' );
recalibrate();
