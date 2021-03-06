var core = require('core');
// var colors = require('./colors.js');
//
// var test = {};
// var t;
// for (var c in colors) {
//   t = c.slice(0, 3);
//   if(!test[t]){ test[t] = [] }
//   test[t].push({ name: c, value: colors[c] });
// }

var style = {
  width: 30,
  height: 30,
  borderRadius: '50%',
  border: '1px solid #ddd',
  cursor: '-webkit-grab',
  outline: 0
}

core.Component('Swatch', {
  render(){
    var color = this.props.color;
    var wrap = { width: 30, height: 30, border: this.props.active ? '1px solid #880' : 'none', padding: '1px', borderRadius: '2px'}
    var style = { width: 28, height: 28, background: color.value, borderRadius: '2px', cursor: 'pointer' };
    if(color && color.name === 'transparent'){
      style.border = '2px #000 dashed'
    }
    return (
      <div style={ wrap }>
        <div style={ style }
             key={ color.name }
             onClick={ e => this.props.onClick(this.props.color) }></div>
       </div>
    );
  }
});

const Cell = props =>
  <div style={{ padding: '2px', background: (props.active ? '#ff0' : 'none') }} onClick={ props.select }>
    <div style={{ height: 20, background: props.background }}></div>
  </div>

const ButtonSample = props =>
  <div style={{ padding: '2px', background: (props.active ? '#ff0' : 'none') }} onClick={ props.select }>
    <div style={{ height: 20, background: props.background }}></div>
  </div>

core.Component('Palletes', ['ui.Table'], (Table)=>{
  return {
    bindings: {
      palletes: ['core', 'theme', 'palletes']
    },
    getInitialState(){
      return {
        targetPalleteName: null,
        targetItemName: null
      };
    },
    selectTarget(palleteName, itemName){
      this.setState({
        targetPalleteName: palleteName,
        targetItemName: itemName
      });
    },
    setValue(color){
      this.props.onSelect(color);
    },
    render(){
      var palletes = this.state.palletes;
      return (
        <div>
          <Table style={{ textAlign: 'center' }}
                 columns={[{
              "title": "normal",
            },{
              "title": "hover",
            },{
              "title": "active",
            },{
              "title": "disabled",
            }]} rows={ palletes && palletes.map((pallete)=>{
              return {
                name: pallete.name,
                cells: [
                  <Cell background={ pallete.pallete.normal }
                        active={ (this.state.targetPalleteName === pallete.name) && (this.state.targetItemName === 'normal') }
                        select={ e => this.selectTarget(pallete.name, 'normal') }/>,
                  <Cell background={ pallete.pallete.hover }
                        active={ (this.state.targetPalleteName === pallete.name) && (this.state.targetItemName === 'hover') }
                        select={ e => this.selectTarget(pallete.name, 'hover') }/>,
                  <Cell background={ pallete.pallete.active }
                        active={ (this.state.targetPalleteName === pallete.name) && (this.state.targetItemName === 'active') }
                        select={ e => this.selectTarget(pallete.name, 'active') }/>,
                  <Cell background={ pallete.pallete.disabled }
                        active={ (this.state.targetPalleteName === pallete.name) && (this.state.targetItemName === 'disabled') }
                        select={ e => this.selectTarget(pallete.name, 'disabled') }/>
                ]
              };
            }) }/>
        </div>
      );
    }
  }
})

core.Component('ColorPicker', ['ui.Button'], (Button)=>{
  return {
    renderSection(section){
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {
            section.map(color => core.render({
              Swatch: {
                active: this.props.selected === color.value,
                color: color,
                key: color.name,
                onClick: this.setValue
              }
            }))
          }
        </div>
      );
    },
    render(){
      var selected = this.props.selected;
      var background = selected ? selected.value : 'none';
      var swatches = [];
      for(var m in colors){
        swatches.push(<div style={{  }} key={ m }>{ this.renderSection(colors[m]) }</div>);
      }
      return (
        <div style={{ overflow: 'auto', display: 'flex', flexDirection: 'column', background: '#888'}}>
          { swatches }
        </div>
      );
    }
  };
});

core.Component('ThemeEditor', ['ColorPicker', 'Palletes'], (ColorPicker, Palletes)=>{
  return {
    render(){
      return (
        <div style={{ display: 'flex', background: '#888'}}>
          <ColorPicker/>
          <div style={{ overflow: 'auto', display: 'flex', flexDirection: 'column', flex: 1}}>
            <Palletes onSelect={ this.props.onSelect }/>
          </div>
        </div>
      );
    }
  };
});


var colors = {
  "red": [
    {
      "name": "red50",
      "value": "#ffebee"
    },
    {
      "name": "red100",
      "value": "#ffcdd2"
    },
    {
      "name": "red200",
      "value": "#ef9a9a"
    },
    {
      "name": "red300",
      "value": "#e57373"
    },
    {
      "name": "red400",
      "value": "#ef5350"
    },
    {
      "name": "red500",
      "value": "#f44336"
    },
    {
      "name": "red600",
      "value": "#e53935"
    },
    {
      "name": "red700",
      "value": "#d32f2f"
    },
    {
      "name": "red800",
      "value": "#c62828"
    },
    {
      "name": "red900",
      "value": "#b71c1c"
    },
    {
      "name": "redA100",
      "value": "#ff8a80"
    },
    {
      "name": "redA200",
      "value": "#ff5252"
    },
    {
      "name": "redA400",
      "value": "#ff1744"
    },
    {
      "name": "redA700",
      "value": "#d50000"
    }
  ],
  "pink": [
    {
      "name": "pink50",
      "value": "#fce4ec"
    },
    {
      "name": "pink100",
      "value": "#f8bbd0"
    },
    {
      "name": "pink200",
      "value": "#f48fb1"
    },
    {
      "name": "pink300",
      "value": "#f06292"
    },
    {
      "name": "pink400",
      "value": "#ec407a"
    },
    {
      "name": "pink500",
      "value": "#e91e63"
    },
    {
      "name": "pink600",
      "value": "#d81b60"
    },
    {
      "name": "pink700",
      "value": "#c2185b"
    },
    {
      "name": "pink800",
      "value": "#ad1457"
    },
    {
      "name": "pink900",
      "value": "#880e4f"
    },
    {
      "name": "pinkA100",
      "value": "#ff80ab"
    },
    {
      "name": "pinkA200",
      "value": "#ff4081"
    },
    {
      "name": "pinkA400",
      "value": "#f50057"
    },
    {
      "name": "pinkA700",
      "value": "#c51162"
    }
  ],
  "purple": [
    {
      "name": "purple50",
      "value": "#f3e5f5"
    },
    {
      "name": "purple100",
      "value": "#e1bee7"
    },
    {
      "name": "purple200",
      "value": "#ce93d8"
    },
    {
      "name": "purple300",
      "value": "#ba68c8"
    },
    {
      "name": "purple400",
      "value": "#ab47bc"
    },
    {
      "name": "purple500",
      "value": "#9c27b0"
    },
    {
      "name": "purple600",
      "value": "#8e24aa"
    },
    {
      "name": "purple700",
      "value": "#7b1fa2"
    },
    {
      "name": "purple800",
      "value": "#6a1b9a"
    },
    {
      "name": "purple900",
      "value": "#4a148c"
    },
    {
      "name": "purpleA100",
      "value": "#ea80fc"
    },
    {
      "name": "purpleA200",
      "value": "#e040fb"
    },
    {
      "name": "purpleA400",
      "value": "#d500f9"
    },
    {
      "name": "purpleA700",
      "value": "#aa00ff"
    }
  ],
  "deepPurple": [
    {
      "name": "deepPurple50",
      "value": "#ede7f6"
    },
    {
      "name": "deepPurple100",
      "value": "#d1c4e9"
    },
    {
      "name": "deepPurple200",
      "value": "#b39ddb"
    },
    {
      "name": "deepPurple300",
      "value": "#9575cd"
    },
    {
      "name": "deepPurple400",
      "value": "#7e57c2"
    },
    {
      "name": "deepPurple500",
      "value": "#673ab7"
    },
    {
      "name": "deepPurple600",
      "value": "#5e35b1"
    },
    {
      "name": "deepPurple700",
      "value": "#512da8"
    },
    {
      "name": "deepPurple800",
      "value": "#4527a0"
    },
    {
      "name": "deepPurple900",
      "value": "#311b92"
    },
    {
      "name": "deepPurpleA100",
      "value": "#b388ff"
    },
    {
      "name": "deepPurpleA200",
      "value": "#7c4dff"
    },
    {
      "name": "deepPurpleA400",
      "value": "#651fff"
    },
    {
      "name": "deepPurpleA700",
      "value": "#6200ea"
    }
  ],
  "indigo": [
    {
      "name": "indigo50",
      "value": "#e8eaf6"
    },
    {
      "name": "indigo100",
      "value": "#c5cae9"
    },
    {
      "name": "indigo200",
      "value": "#9fa8da"
    },
    {
      "name": "indigo300",
      "value": "#7986cb"
    },
    {
      "name": "indigo400",
      "value": "#5c6bc0"
    },
    {
      "name": "indigo500",
      "value": "#3f51b5"
    },
    {
      "name": "indigo600",
      "value": "#3949ab"
    },
    {
      "name": "indigo700",
      "value": "#303f9f"
    },
    {
      "name": "indigo800",
      "value": "#283593"
    },
    {
      "name": "indigo900",
      "value": "#1a237e"
    },
    {
      "name": "indigoA100",
      "value": "#8c9eff"
    },
    {
      "name": "indigoA200",
      "value": "#536dfe"
    },
    {
      "name": "indigoA400",
      "value": "#3d5afe"
    },
    {
      "name": "indigoA700",
      "value": "#304ffe"
    }
  ],
  "blue": [
    {
      "name": "blue50",
      "value": "#e3f2fd"
    },
    {
      "name": "blue100",
      "value": "#bbdefb"
    },
    {
      "name": "blue200",
      "value": "#90caf9"
    },
    {
      "name": "blue300",
      "value": "#64b5f6"
    },
    {
      "name": "blue400",
      "value": "#42a5f5"
    },
    {
      "name": "blue500",
      "value": "#2196f3"
    },
    {
      "name": "blue600",
      "value": "#1e88e5"
    },
    {
      "name": "blue700",
      "value": "#1976d2"
    },
    {
      "name": "blue800",
      "value": "#1565c0"
    },
    {
      "name": "blue900",
      "value": "#0d47a1"
    },
    {
      "name": "blueA100",
      "value": "#82b1ff"
    },
    {
      "name": "blueA200",
      "value": "#448aff"
    },
    {
      "name": "blueA400",
      "value": "#2979ff"
    },
    {
      "name": "blueA700",
      "value": "#2962ff"
    }
  ],
  "lightBlue": [
    {
      "name": "lightBlue50",
      "value": "#e1f5fe"
    },
    {
      "name": "lightBlue100",
      "value": "#b3e5fc"
    },
    {
      "name": "lightBlue200",
      "value": "#81d4fa"
    },
    {
      "name": "lightBlue300",
      "value": "#4fc3f7"
    },
    {
      "name": "lightBlue400",
      "value": "#29b6f6"
    },
    {
      "name": "lightBlue500",
      "value": "#03a9f4"
    },
    {
      "name": "lightBlue600",
      "value": "#039be5"
    },
    {
      "name": "lightBlue700",
      "value": "#0288d1"
    },
    {
      "name": "lightBlue800",
      "value": "#0277bd"
    },
    {
      "name": "lightBlue900",
      "value": "#01579b"
    },
    {
      "name": "lightBlueA100",
      "value": "#80d8ff"
    },
    {
      "name": "lightBlueA200",
      "value": "#40c4ff"
    },
    {
      "name": "lightBlueA400",
      "value": "#00b0ff"
    },
    {
      "name": "lightBlueA700",
      "value": "#0091ea"
    }
  ],
  "cyan": [
    {
      "name": "cyan50",
      "value": "#e0f7fa"
    },
    {
      "name": "cyan100",
      "value": "#b2ebf2"
    },
    {
      "name": "cyan200",
      "value": "#80deea"
    },
    {
      "name": "cyan300",
      "value": "#4dd0e1"
    },
    {
      "name": "cyan400",
      "value": "#26c6da"
    },
    {
      "name": "cyan500",
      "value": "#00bcd4"
    },
    {
      "name": "cyan600",
      "value": "#00acc1"
    },
    {
      "name": "cyan700",
      "value": "#0097a7"
    },
    {
      "name": "cyan800",
      "value": "#00838f"
    },
    {
      "name": "cyan900",
      "value": "#006064"
    },
    {
      "name": "cyanA100",
      "value": "#84ffff"
    },
    {
      "name": "cyanA200",
      "value": "#18ffff"
    },
    {
      "name": "cyanA400",
      "value": "#00e5ff"
    },
    {
      "name": "cyanA700",
      "value": "#00b8d4"
    }
  ],
  "teal": [
    {
      "name": "teal50",
      "value": "#e0f2f1"
    },
    {
      "name": "teal100",
      "value": "#b2dfdb"
    },
    {
      "name": "teal200",
      "value": "#80cbc4"
    },
    {
      "name": "teal300",
      "value": "#4db6ac"
    },
    {
      "name": "teal400",
      "value": "#26a69a"
    },
    {
      "name": "teal500",
      "value": "#009688"
    },
    {
      "name": "teal600",
      "value": "#00897b"
    },
    {
      "name": "teal700",
      "value": "#00796b"
    },
    {
      "name": "teal800",
      "value": "#00695c"
    },
    {
      "name": "teal900",
      "value": "#004d40"
    },
    {
      "name": "tealA100",
      "value": "#a7ffeb"
    },
    {
      "name": "tealA200",
      "value": "#64ffda"
    },
    {
      "name": "tealA400",
      "value": "#1de9b6"
    },
    {
      "name": "tealA700",
      "value": "#00bfa5"
    }
  ],
  "green": [
    {
      "name": "green50",
      "value": "#e8f5e9"
    },
    {
      "name": "green100",
      "value": "#c8e6c9"
    },
    {
      "name": "green200",
      "value": "#a5d6a7"
    },
    {
      "name": "green300",
      "value": "#81c784"
    },
    {
      "name": "green400",
      "value": "#66bb6a"
    },
    {
      "name": "green500",
      "value": "#4caf50"
    },
    {
      "name": "green600",
      "value": "#43a047"
    },
    {
      "name": "green700",
      "value": "#388e3c"
    },
    {
      "name": "green800",
      "value": "#2e7d32"
    },
    {
      "name": "green900",
      "value": "#1b5e20"
    },
    {
      "name": "greenA100",
      "value": "#b9f6ca"
    },
    {
      "name": "greenA200",
      "value": "#69f0ae"
    },
    {
      "name": "greenA400",
      "value": "#00e676"
    },
    {
      "name": "greenA700",
      "value": "#00c853"
    }
  ],
  "lightGreen": [
    {
      "name": "lightGreen50",
      "value": "#f1f8e9"
    },
    {
      "name": "lightGreen100",
      "value": "#dcedc8"
    },
    {
      "name": "lightGreen200",
      "value": "#c5e1a5"
    },
    {
      "name": "lightGreen300",
      "value": "#aed581"
    },
    {
      "name": "lightGreen400",
      "value": "#9ccc65"
    },
    {
      "name": "lightGreen500",
      "value": "#8bc34a"
    },
    {
      "name": "lightGreen600",
      "value": "#7cb342"
    },
    {
      "name": "lightGreen700",
      "value": "#689f38"
    },
    {
      "name": "lightGreen800",
      "value": "#558b2f"
    },
    {
      "name": "lightGreen900",
      "value": "#33691e"
    },
    {
      "name": "lightGreenA100",
      "value": "#ccff90"
    },
    {
      "name": "lightGreenA200",
      "value": "#b2ff59"
    },
    {
      "name": "lightGreenA400",
      "value": "#76ff03"
    },
    {
      "name": "lightGreenA700",
      "value": "#64dd17"
    }
  ],
  "lime": [
    {
      "name": "lime50",
      "value": "#f9fbe7"
    },
    {
      "name": "lime100",
      "value": "#f0f4c3"
    },
    {
      "name": "lime200",
      "value": "#e6ee9c"
    },
    {
      "name": "lime300",
      "value": "#dce775"
    },
    {
      "name": "lime400",
      "value": "#d4e157"
    },
    {
      "name": "lime500",
      "value": "#cddc39"
    },
    {
      "name": "lime600",
      "value": "#c0ca33"
    },
    {
      "name": "lime700",
      "value": "#afb42b"
    },
    {
      "name": "lime800",
      "value": "#9e9d24"
    },
    {
      "name": "lime900",
      "value": "#827717"
    },
    {
      "name": "limeA100",
      "value": "#f4ff81"
    },
    {
      "name": "limeA200",
      "value": "#eeff41"
    },
    {
      "name": "limeA400",
      "value": "#c6ff00"
    },
    {
      "name": "limeA700",
      "value": "#aeea00"
    }
  ],
  "yellow": [
    {
      "name": "yellow50",
      "value": "#fffde7"
    },
    {
      "name": "yellow100",
      "value": "#fff9c4"
    },
    {
      "name": "yellow200",
      "value": "#fff59d"
    },
    {
      "name": "yellow300",
      "value": "#fff176"
    },
    {
      "name": "yellow400",
      "value": "#ffee58"
    },
    {
      "name": "yellow500",
      "value": "#ffeb3b"
    },
    {
      "name": "yellow600",
      "value": "#fdd835"
    },
    {
      "name": "yellow700",
      "value": "#fbc02d"
    },
    {
      "name": "yellow800",
      "value": "#f9a825"
    },
    {
      "name": "yellow900",
      "value": "#f57f17"
    },
    {
      "name": "yellowA100",
      "value": "#ffff8d"
    },
    {
      "name": "yellowA200",
      "value": "#ffff00"
    },
    {
      "name": "yellowA400",
      "value": "#ffea00"
    },
    {
      "name": "yellowA700",
      "value": "#ffd600"
    }
  ],
  "amber": [
    {
      "name": "amber50",
      "value": "#fff8e1"
    },
    {
      "name": "amber100",
      "value": "#ffecb3"
    },
    {
      "name": "amber200",
      "value": "#ffe082"
    },
    {
      "name": "amber300",
      "value": "#ffd54f"
    },
    {
      "name": "amber400",
      "value": "#ffca28"
    },
    {
      "name": "amber500",
      "value": "#ffc107"
    },
    {
      "name": "amber600",
      "value": "#ffb300"
    },
    {
      "name": "amber700",
      "value": "#ffa000"
    },
    {
      "name": "amber800",
      "value": "#ff8f00"
    },
    {
      "name": "amber900",
      "value": "#ff6f00"
    },
    {
      "name": "amberA100",
      "value": "#ffe57f"
    },
    {
      "name": "amberA200",
      "value": "#ffd740"
    },
    {
      "name": "amberA400",
      "value": "#ffc400"
    },
    {
      "name": "amberA700",
      "value": "#ffab00"
    }
  ],
  "orange": [
    {
      "name": "orange50",
      "value": "#fff3e0"
    },
    {
      "name": "orange100",
      "value": "#ffe0b2"
    },
    {
      "name": "orange200",
      "value": "#ffcc80"
    },
    {
      "name": "orange300",
      "value": "#ffb74d"
    },
    {
      "name": "orange400",
      "value": "#ffa726"
    },
    {
      "name": "orange500",
      "value": "#ff9800"
    },
    {
      "name": "orange600",
      "value": "#fb8c00"
    },
    {
      "name": "orange700",
      "value": "#f57c00"
    },
    {
      "name": "orange800",
      "value": "#ef6c00"
    },
    {
      "name": "orange900",
      "value": "#e65100"
    },
    {
      "name": "orangeA100",
      "value": "#ffd180"
    },
    {
      "name": "orangeA200",
      "value": "#ffab40"
    },
    {
      "name": "orangeA400",
      "value": "#ff9100"
    },
    {
      "name": "orangeA700",
      "value": "#ff6d00"
    }
  ],
  "deepOrange": [
    {
      "name": "deepOrange50",
      "value": "#fbe9e7"
    },
    {
      "name": "deepOrange100",
      "value": "#ffccbc"
    },
    {
      "name": "deepOrange200",
      "value": "#ffab91"
    },
    {
      "name": "deepOrange300",
      "value": "#ff8a65"
    },
    {
      "name": "deepOrange400",
      "value": "#ff7043"
    },
    {
      "name": "deepOrange500",
      "value": "#ff5722"
    },
    {
      "name": "deepOrange600",
      "value": "#f4511e"
    },
    {
      "name": "deepOrange700",
      "value": "#e64a19"
    },
    {
      "name": "deepOrange800",
      "value": "#d84315"
    },
    {
      "name": "deepOrange900",
      "value": "#bf360c"
    },
    {
      "name": "deepOrangeA100",
      "value": "#ff9e80"
    },
    {
      "name": "deepOrangeA200",
      "value": "#ff6e40"
    },
    {
      "name": "deepOrangeA400",
      "value": "#ff3d00"
    },
    {
      "name": "deepOrangeA700",
      "value": "#dd2c00"
    }
  ],
  "brown": [
    {
      "name": "brown50",
      "value": "#efebe9"
    },
    {
      "name": "brown100",
      "value": "#d7ccc8"
    },
    {
      "name": "brown200",
      "value": "#bcaaa4"
    },
    {
      "name": "brown300",
      "value": "#a1887f"
    },
    {
      "name": "brown400",
      "value": "#8d6e63"
    },
    {
      "name": "brown500",
      "value": "#795548"
    },
    {
      "name": "brown600",
      "value": "#6d4c41"
    },
    {
      "name": "brown700",
      "value": "#5d4037"
    },
    {
      "name": "brown800",
      "value": "#4e342e"
    },
    {
      "name": "brown900",
      "value": "#3e2723"
    }
  ],
  "blueGrey": [
    {
      "name": "blueGrey50",
      "value": "#eceff1"
    },
    {
      "name": "blueGrey100",
      "value": "#cfd8dc"
    },
    {
      "name": "blueGrey200",
      "value": "#b0bec5"
    },
    {
      "name": "blueGrey300",
      "value": "#90a4ae"
    },
    {
      "name": "blueGrey400",
      "value": "#78909c"
    },
    {
      "name": "blueGrey500",
      "value": "#607d8b"
    },
    {
      "name": "blueGrey600",
      "value": "#546e7a"
    },
    {
      "name": "blueGrey700",
      "value": "#455a64"
    },
    {
      "name": "blueGrey800",
      "value": "#37474f"
    },
    {
      "name": "blueGrey900",
      "value": "#263238"
    }
  ],
  "grey": [
    {
      "name": "grey50",
      "value": "#fafafa"
    },
    {
      "name": "grey100",
      "value": "#f5f5f5"
    },
    {
      "name": "grey200",
      "value": "#eeeeee"
    },
    {
      "name": "grey300",
      "value": "#e0e0e0"
    },
    {
      "name": "grey400",
      "value": "#bdbdbd"
    },
    {
      "name": "grey500",
      "value": "#9e9e9e"
    },
    {
      "name": "grey600",
      "value": "#757575"
    },
    {
      "name": "grey700",
      "value": "#616161"
    },
    {
      "name": "grey800",
      "value": "#424242"
    },
    {
      "name": "grey900",
      "value": "#212121"
    }
  ],
  "other": [
    {
      "name": "black",
      "value": "#000000"
    },
    {
      "name": "darkBlack",
      "value": "rgba(0, 0, 0, 0.87)"
    },
    {
      "name": "minBlack",
      "value": "rgba(0, 0, 0, 0.26)"
    },
    {
      "name": "faintBlack",
      "value": "rgba(0, 0, 0, 0.12)"
    },
    {
      "name": "lightBlack",
      "value": "rgba(0, 0, 0, 0.54)"
    },
    {
      "name": "white",
      "value": "#ffffff"
    },
    {
      "name": "darkWhite",
      "value": "rgba(255, 255, 255, 0.87)"
    },
    {
      "name": "lightWhite",
      "value": "rgba(255, 255, 255, 0.54)"
    },
    {
      "name": "transparent",
      "value": "rgba(0, 0, 0, 0)"
    }
  ]

}
