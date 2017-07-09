import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';
import config from '../../config/commConfig';

import createSocket from '../shared/socket';

let socket;

class CommConfig extends Component {
  constructor (props) {
    super(props);
    this.render = this.render.bind(this);

    this.state = {
      streamManager: new StreamingPageManager(),
      value: 0,
      commConfig: config
    };
  }

  startServer () {
    socket = createSocket();
    socket.emit('join', {name: 'configs', room: 'commConfig'});

    socket.on('udp:event', function (data) {
      console.log(data);
    });
  }

  componentWillMount () {
    this.startServer();
  }

  componentDidMount () {
    var _this = this;
  }

  handleChange (legend, key, e) {
    var _this = this;
    var _name = e.currentTarget.name;
    var _value = e.currentTarget.value;
    var _commConfig = _this.state.commConfig;

    if (!isNaN(_value) && _value !== '') { _value = parseInt(_value, 10); }

    if (key !== null) { _commConfig[legend][key][_name] = _value; } else {
      if (legend) { _commConfig[legend][_name] = _value; } else { _commConfig[_name] = _value; }
    }

    _this.setState({_commConfig: _commConfig});
  }

  saveChanges () {
    socket.emit('update_commConfig', this.state.commConfig);
  }

  render () {
    var _this = this;
    var inputs = [];

    return (
          <div className="Overview-content">
        {Object.keys(this.state.commConfig).map(function (item, index) {
          var label = item;
          var input = _this.state.commConfig[label];

          switch (typeof (input)) {
            case 'object':
              {
                if (Array.isArray(input)) {
                  input.map(function (aItem, aIndex) {
                    if (typeof (aItem) === 'object') {
                      var aoInputGroup = [];
                      aoInputGroup.push({legend: label, key: aIndex});

                      Object.keys(aItem).map(function (aoItem, aoIndex) {
                        var aoLabel = aoItem;
                        var aoInput = aItem[aoLabel];

                        return aoInputGroup.push({input: aoInput, label: aoLabel});
                      });

                      return inputs.push(aoInputGroup);
                    } else {
                      var aLabel = Object.keys(aItem);
                      var aInput = aItem;

                      return inputs.push({legend: label, input: aInput, label: aLabel});
                    }
                  });
                } else {
                  var oInputGroup = [];
                  oInputGroup.push({legend: label, key: null});

                  Object.keys(input).map(function (oItem, oIndex) {
                    var oLabel = oItem;
                    var oInput = input[oLabel];

                    return oInputGroup.push({input: oInput, label: oLabel});
                  });

                  return inputs.push(oInputGroup);
                }
                break;
              }
            default:
              {
                return inputs.push({legend: label, input: input, label: label});
              }
          }

          return false;
        })
      }
          {
            inputs.map(function (elem, inx) {
              var isArr = Array.isArray(elem);
              function elemGroup () {
                if (isArr) {
                  return (<fieldset>
                  <legend>{elem[0].legend}</legend>
                    {elem.map(function (e, i) {
                      if (e.label) { // do not show empty inputs
                        return (
                          <div key={inx + '-' + i} className="form-group">
                            <label htmlFor={e.label}>{e.label}</label>
                            <input type="text" id={e.label} name={e.label} value={e.input} onChange={_this.handleChange.bind(_this, elem[0].legend, elem[0].key)}/>
                          </div>
                        );
                      }
                      return false;
                    })}
                  </fieldset>);
                } else {
                  return (<fieldset>
                  <legend>{elem.legend}</legend>
                    <label htmlFor={elem.label}>{elem.label}</label>
                    <input type="text" id={elem.label} name={elem.label} value={elem.input} onChange={_this.handleChange.bind(_this, null, null)}/>
                  </fieldset>);
                }
              }
              return (
                <div key={inx} className="form-group">
                  {
                    elemGroup()
                  }
                </div>
              );
            })
          }
          <button className="btn btn-primary" onClick={_this.saveChanges.bind(_this)}>Save Changes</button>
      </div>
    );
  }
}

export default CommConfig;
