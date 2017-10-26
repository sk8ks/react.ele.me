import CSSModules from 'react-css-modules';

export default (component, style, options = {allowMultiple: true, handleNotFoundStyleName: 'ignore'}) =>  CSSModules(component, style, options)
