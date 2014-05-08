/**
 * 占位符操作符
 */

define( function ( require, exports, modules ) {

    var kity = require( "kity" ),
        SELECT_COLOR = require( "kf-ext/def" ).selectColor,
        ALL_SELECT_COLOR = require( "kf-ext/def" ).allSelectColor;

    return kity.createClass( 'PlaceholderOperator', {

        base: require( "kf" ).Operator,

        constructor: function () {

            this.opShape = null;
            this.callBase( "Placeholder" );

        },

        applyOperand: function () {

            this.opShape = generateOpShape( this, this.parentExpression.getLabel() );
            this.parentExpression.expand( 20, 20 );
            this.parentExpression.translateElement( 10, 10 );

        },

        select: function () {

            this.opShape.fill( SELECT_COLOR );

        },

        selectAll: function () {

            this.opShape.fill( ALL_SELECT_COLOR );

        },

        unselect: function () {

            this.opShape.fill( "transparent" );

        }

    } );

    function generateOpShape ( operator, label ) {

        if ( label !== null ) {
            return createRootPlaceholder( operator, label );
        } else {
            return createCommonShape( operator );
        }


    }

    // 创建通用图形
    function createCommonShape ( operator ) {

        var w = 35,
            h = 50,
            shape = null;

        shape =  new kity.Rect( w, h, 0, 0 ).stroke( "black" ).fill( "transparent" );
        shape.setAttr( "stroke-dasharray", "5, 5" );

        operator.addOperatorShape( shape );

        return shape;

    }

    // 创建根占位符图形
    function createRootPlaceholder ( operator, label ) {


        var textShape = new kity.Text( label ),
            shapeGroup = new kity.Group(),
            padding = 10,
            borderBoxShape = null,
            textBox = null;

        shapeGroup.addShape( textShape );
        operator.addOperatorShape( shapeGroup );

        textBox = textShape.getFixRenderBox();

        // 宽度要加上padding
        borderBoxShape =  new kity.Rect( textBox.width + padding * 2, textBox.height + padding * 2, 0, 0 ).stroke( "black" ).fill( "transparent" );
        borderBoxShape.setAttr( "stroke-dasharray", "5, 5" );

        textShape.setAttr( {
            dx: 0-textBox.x,
            dy: 0-textBox.y
        } );

        textShape.translate( padding, padding );

        shapeGroup.addShape( borderBoxShape );

        // 对于根占位符， 返回的不是组， 而是组容器内部的虚线框。 以方便选中变色
        return borderBoxShape;

    }

} );