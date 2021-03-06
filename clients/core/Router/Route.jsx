
var core = require('core');
var React = require('react');

var box = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden'
};

var animation = {
  init(page){
    page.speed('0.4s').ease('ease');
  },
  forward: {
    open(page){
      page.x('100%').enter().x('0').done();
    },
    close(page){
      page.wait(100).x('-100%').wait(600).exit();
    }
  },
  back: {
    open(page){
      page.x('-100%').enter().x('0').done();
    },
    close(page){
      page.wait(100).x('100%').wait(600).exit();
    }
  }
};

module.exports = function(core){

  const routerCursor = core.tree.select(['core', 'router']);

  const Route = core.Component('core.router.Route', {
    propTypes: {
      route: 'object',
      query: 'object',
      id: 'string!',
      className: 'string'
    },
    childContextTypes: {
      route: 'object'
    },
    getChildContext(){
      return {
        route: this
      };
    },
    getInitialState(){
      var animation = routerCursor.get('animation');
      var time = new Date().getTime();
      var classes = {
        animation: `core-animation-${animation.name}`,
        active: `core-animation-${animation.name}-active`,
        enter: `core-animation-${animation.name}-enter`,
        enterForward: `core-animation-${animation.name}-enter-forward`,
        enterBack: `core-animation-${animation.name}-enter-back`,
        leave: `core-animation-${animation.name}-leave`,
        leaveForward: `core-animation-${animation.name}-leave-forward`,
        leaveBack: `core-animation-${animation.name}-leave-back`
      };
      var history = [{ ...this.props, time: time }];
      return {
        animation: animation,
        classes: classes,
        stage: 'idle',
        direction: 'forward',
        classNames: [`${ classes.animation } ${ classes.active }`, classes.animation, classes.animation],
        history: history,
        viewIndex: 0
      };
    },
    componentWillReceiveProps(nextProps, nextState){

      if(nextProps.route !== this.props.route){
        var animation = this.state.animation;
        var time = new Date().getTime();
        var history = [ ...this.state.history, { ...nextProps, time: time } ];
        this.setState({ history: history });
        if(animation && animation.duration){
          setTimeout(clear, animation.duration + 50);
        }
      }

    },
    clear(){
      if(!this.isMounted()) return;
      var history = [ ...this.state.history ];
      history.shift();
      this.setState({ history: history });
    },
    to(path, query){

    },
    renderRoute({ route, query, id, time }) {
      console.debug("render route", route);
      if(!route || !route.component) return null;
      var component = core.components[route.component];
      if(!component) {
        console.error(`cannot find component ${route.component}`);
        return null;
      }
      var children = route.children || [];
      var props = { key: id, route: route, ...query };
      return React.createElement(component, props, children.map((child, i)=>{
        return <Route route={ child } query={ query } id={ `${id}.${i}` } key={ i }/>;
      }));
    },
    render(){
      var { route, query, id } = this.props;
      var classNames = this.state.classNames;
      var history = this.state.history;
      if(this.state.animation){
        console.debug("render", route.name, route.component, views  );
        return (
          <div style={ box }>
            { this.state.history.map(item => this.renderRoute(item)) }
          </div>
        );
      }
      console.debug("history", history);
      return this.renderRoute(history[history.length - 1]);
    }
  });

  return Route;
};




/*



function clone(item) {
  if(Array.isArray(item)) return item.concat([]);
  var result = {};
  for(var m in item){
    result[m] = item[m];
  }
  return result;
}

function equals(a, b){
  var ta = typeof a;
  var tb = typeof b;
  if(ta !== tb) return false;
  if(ta === 'object'){
    if(Array.isArray(a)){
      if(a.length !== b.length) return false;
      if(!a.length) return true;
      for (var i = 0; i < a.length; i++) {
        if(!equals(a[i], b[i])) return false;
      }
      return true;
    }
    else{
      if(Object.keys(a) !== Object.keys(b)) return false;
      for(var m in a){
        if(!equals(a[m], b[m])) return false;
      }
      return true;
    }
  }
  else{
    return a === b;
  }
}

function set(target, array, value){
  var field = array.shift();
  var newValue;
  if(!array.length) {
    newValue = value;
  }
  else{
    if(!target[field] || typeof target[field] !== 'object') target[field] = {};
    newValue = set(target[field], array, value);
  }
  if(!equals(newValue, target[field])){
    target = clone(target);
    target[field] = newValue;
  }
  return target;
}
function find(target, array){
  if(!target) return null;
  if(!array.length) return target || null;
  var field = array.shift();
  return find(target[field], array);
}

function getChildMap(name, map){  // find 'name' in 'routes', if not found return the default route
  name = name.toLowerCase();
  var defaultive = null;
  var children = map.children;
  if(!name || !children) return null;
  for (var i = 0; i < children.length; i++) {
    if(children[i].name === name) return children[i];
    if(children[i].name === map.defaultChild) defaultive = children[i];
  }
  console.warn(`invalid route ${name}, defaulting to ${defaultive}`)
  return defaultive;
}

function Route(urlArray, parent, router) {
  if(!urlArray.length) return null;
  var name = urlArray.shift();
  this.parent = parent;
  this.router = router;
  if(parent.map){  // restricted routes
    this.map = getChildMap(name, parent.map);
    if(this.map){
      this.name = this.map.name;
      this.component = this.map.component;
      if(this.map.defaultChild && !urlArray.length){
        urlArray.push(this.map.defaultChild);
      }
    }
    else {
      this.name =  name;
      this.component = null;
    }
  }
  else{  // freestyle
    this.map = null;
    this.name = name;
    this.component = name;
  }
  this.children = urlArray.length ? [ new Route(urlArray, this, router) ] : [];
}


Route.prototype = {
  query: {},
  to(urlString, queryObject, silent){
    var route = this;
    var root = router.route;
    var urlArray = urlString.split('/');
    var absolute = false;
    if(!urlArray[0]){  // '/myRoute' - absolute path sets the root
      absolute = true;
      urlArray.shift();
    }
    else if(urlArray[0] === '.'){  // './myRoute' - change the current route
      route = this.parent || this;
      urlArray.shift();
    }
    else if(urlArray[0] === '..'){   // '../myRoute' - set parent of current route
      route = this.parent || this;
      while(urlArray[0] === '..'){
        route = route.parent || route;
        urlArray.shift();
      }
    }
    else{
      route = this;
    }
    if(queryObject) Route.prototype.query = queryObject;
    if(absolute){
      var topRoute = { map: router.props.routes ? { children: router.props.routes } : null };
      root = new Route(urlArray, topRoute, router)
    }
    else{
      route.children[0] = new Route(urlArray, route, router);
    }
    return router.toRoute(root, silent);
  },
  get(string){
    return find(Route.prototype.query, string.split('.'));
  },
  set(path, any, silent){
    var array = path.split('.');
    var query = set(Route.prototype.query, array, any);
    // console.debug("query", query);
    Route.prototype.query = query;
    this.render(silent);
  },

  remove(){
    var path, modified;
    for (var i = 0; i < arguments.length; i++) {
      path = arguments[i];
      var array = path.split('.');
      var name = array.pop();
      if(!array.length) {
        delete Route.prototype.query[name];
        modified = true;
      }
      else{
        var target = find(Route.prototype.query, array);
        if(target){
          delete target[name];
          modified = true;
        }
      }
    }
    if(modified) this.render(true);
  },
  render(silent){
    this.router.toRoute(this.router.route, silent);
  }
};

*/
