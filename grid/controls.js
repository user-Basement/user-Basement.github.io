'use strict';

document.write (
  '<aside class="cntr">'  + '\n' +
  '  <div class="lt">'  + '\n' +
  '	<div class="ctrl cntr">'  + '\n' +
  '	  <label for="rule-lines" id="rule">'  + '\n' +
  '		<input type="checkbox" id="rule-lines">'  + '\n' +
  '		<div class="bar">'  + '\n' +
  '		  <p>rule<br>lines</p>'  + '\n' +
  '		  <div class="knob"></div>'  + '\n' +
  '		</div>'  + '\n' +
  '	  </label>'  + '\n' +
  '	  '  + '\n' +
  '	  <label for="center-lines" id="center">'  + '\n' +
  '		<input type="checkbox" id="center-lines">'  + '\n' +
  '		<div class="bar">'  + '\n' +
  '		  <p>center<br>lines</p>'  + '\n' +
  '		  <div class="knob"></div>'  + '\n' +
  '	  </div>   '  + '\n' +
  '	  </label>'  + '\n' +
  '	  '  + '\n' +
  '	  <label for="primary-lines" id="primary">'  + '\n' +
  '		<input type="checkbox" id="primary-lines">'  + '\n' +
  '		<div class="bar">'  + '\n' +
  '		  <p>primary<br>lines</p>'  + '\n' +
  '		  <div class="knob"></div>'  + '\n' +
  '		</div> '  + '\n' +
  '	  </label>'  + '\n' +
  '	  '  + '\n' +
  '	  <label for="secondary-lines" id="secondary">'  + '\n' +
  '		<input type="checkbox" id="secondary-lines">'  + '\n' +
  '		<div class="bar">'  + '\n' +
  '		  <p>secondary<br>lines</p>'  + '\n' +
  '		  <div class="knob"></div>'  + '\n' +
  '		</div>'  + '\n' +
  '	  </label>'  + '\n' +
  '	  '  + '\n' +
  '	  <label for="drawing-lines" id="drawing-btn">'  + '\n' +
  '		<input type="checkbox" id="drawing-lines">'  + '\n' +
  '		<div class="bar" id="drwing">'  + '\n' +
  '		  <p>drawing</p>'  + '\n' +
  '		  <div class="knob"></div>'  + '\n' +
  '		</div> '  + '\n' +
  '	  </label>'  + '\n' +
  '	</div>'  + '\n' +
  '  </div>'  + '\n' +
  '  <div class="rt"></div>'  + '\n' +
  '</aside>'  
);

function swap(){
  var ruleLns = document.querySelector( '.rule-lns' ),
      cntrLns = document.querySelector( '.cntr-lns' ),
      primary = document.querySelector( '.primary' ),
      secondary = document.querySelector( '.secondary' ),
      label = document.querySelector( '.label' ),
      drawing =  document.querySelector( '.drawing' );
  
  if( this.id === 'rule' ){
    if( ruleLns.classList.contains( 'out' ) ){
      ruleLns.classList.remove( 'out' );
      label.classList.remove( 'out' );
    }
    else {
      ruleLns.classList.add( 'out' );
      label.classList.add( 'out' );
    }
  }
  
  if( this.id === 'center' ){
    if( cntrLns.classList.contains( 'out' ) ){
      cntrLns.classList.remove( 'out' );
    }
    else {
      cntrLns.classList.add( 'out' );
    }
  }  
  
  if( this.id === 'primary' ){
    if( primary.classList.contains( 'out' ) ){
      primary.classList.remove( 'out' );
    }
    else {
      primary.classList.add( 'out' );
    }
  }    
  
  if( this.id === 'secondary' ){
    if( secondary.classList.contains( 'out' ) ){
      secondary.classList.remove( 'out' );
    }
    else {
      secondary.classList.add( 'out' );
    }
  }    
  
  if( this.id === 'drawing-btn' ){
    drawing.style.animationName = 'none';
    if( drawing.classList.contains( 'out' ) ){
      drawing.classList.remove( 'out' );
    }
    else {
      drawing.classList.add( 'out' );
    }
  }   
}

var rule = document.getElementById( 'rule' ),
    center = document.getElementById( 'center' ),
    primary = document.getElementById( 'primary' ),
    secondary = document.getElementById( 'secondary' ),
    drawing = document.getElementById( 'drawing-btn' );

rule.addEventListener( 'mousedown', swap );
center.addEventListener( 'mousedown', swap );
primary.addEventListener( 'mousedown', swap );
secondary.addEventListener( 'mousedown', swap );
drawing.addEventListener( 'mousedown', swap );
