import React, { Component } from 'react';
import StreamingPageManager from '../StreamingPageManager.js';

import createSocket from '../shared/socket';
let socket = createSocket();

class HC extends Component {
  constructor (props) {
    super(props);

    this.state = {
      streamManager: new StreamingPageManager(),
      command: 'HC'
    };
  }
  render () {
    return (
        <div>
        <link href="https://fonts.googleapis.com/css?family=Saira+Semi+Condensed" rel="stylesheet" />
        <div id="batteries" class="box">
        <h1 class="box-title">BATTERIES</h1>
        <div class="box little">
            <h2 class="box-title">AVG TEMP</h2>
            <ul id="bat-avg-temp-list">
                <li class="led"><div>1</div></li>
                <li class="led"><div>2</div></li>
            </ul>
        </div>
        <div class="box little">
            <h2 class="box-title">MAX IND TEMP</h2>
            <ul id="bat-max-ind-temp-list">
                <li class="led"><div>1</div></li>
                <li class="led"><div>2</div></li>
            </ul>
        </div>
        <div class="box little">
            <h2 class="box-title">PACK VOLTAGE</h2>
            <ul id="bat-pack-voltage">
                <li class="led"><div>1</div></li>
                <li class="led"><div>2</div></li>
            </ul>
        </div>
        <div class="box little">
            <h2 class="box-title">VOLTAGE RANGE</h2>
            <ul id="bat-cell-voltage-range">
                <li class="led"><div>1</div></li>
                <li class="led"><div>2</div></li>
            </ul>
        </div>
        <div class="box little">
            <h2 class="box-title">CURRENT</h2>
            <ul id="bat-current">
                <li class="led"><div>1</div></li>
                <li class="led"><div>2</div></li>
            </ul>
        </div>
    </div>
    <div class="box" id="other">
        <h1 class="box-title">OTHER BOX</h1>
        <div class="box little">
            <h2 class="box-title">LOTS OF VALUES</h2>
            <ul>
                <li class="led"><div>1</div></li>
                <li class="led"><div>2</div></li>
                <li class="led"><div>3</div></li>
                <li class="led"><div>4</div></li>
                <li class="led"><div>5</div></li>
                <li class="led"><div>6</div></li>
                <li class="led"><div>7</div></li>
                <li class="led"><div>8</div></li>
                <li class="led"><div>9</div></li>
                <li class="led"><div>10</div></li>
                <li class="led"><div>11</div></li>
                <li class="led"><div>12</div></li>
                <li class="led"><div>13</div></li>
                <li class="led"><div>14</div></li>
                <li class="led"><div>15</div></li>
                <li class="led"><div>16</div></li>
                <li class="led"><div>17</div></li>
                <li class="led"><div>18</div></li>
                <li class="led"><div>19</div></li>
                <li class="led"><div>20</div></li>
            </ul>
        </div>
    </div>
    <div class="box" id="other2">
        <h1 class="box-title">OTHER BOX2</h1>
        <div class="box little">
            <h2 class="box-title">LOTS OF VALUES</h2>
            <ul>
                <li class="led"><div>1</div></li>
                <li class="led"><div>2</div></li>
                <li class="led"><div>3</div></li>
                <li class="led"><div>4</div></li>
                <li class="led"><div>5</div></li>
                <li class="led"><div>6</div></li>
                <li class="led"><div>7</div></li>
                <li class="led"><div>8</div></li>
                <li class="led"><div>9</div></li>
                <li class="led"><div>10</div></li>
                <li class="led"><div>11</div></li>
                <li class="led"><div>12</div></li>
                <li class="led"><div>13</div></li>
                <li class="led"><div>14</div></li>
                <li class="led"><div>15</div></li>
                <li class="led"><div>16</div></li>
                <li class="led"><div>17</div></li>
                <li class="led"><div>18</div></li>
                <li class="led"><div>19</div></li>
                <li class="led"><div>20</div></li>
                <li class="led"><div>21</div></li>
                <li class="led"><div>22</div></li>
                <li class="led"><div>23</div></li>
                <li class="led"><div>24</div></li>
                <li class="led"><div>25</div></li>
                <li class="led"><div>26</div></li>
                <li class="led"><div>27</div></li>
                <li class="led"><div>28</div></li>
                <li class="led"><div>29</div></li>
                <li class="led"><div>30</div></li>
                <li class="led"><div>31</div></li>
                <li class="led"><div>32</div></li>
                <li class="led"><div>33</div></li>
                <li class="led"><div>34</div></li>
                <li class="led"><div>35</div></li>
                <li class="led"><div>36</div></li>
                <li class="led"><div>37</div></li>
                <li class="led"><div>38</div></li>
                <li class="led"><div>39</div></li>
                <li class="led"><div>40</div></li>
            </ul>
        </div>
        <div class="box little half" >
            <h2 class="box-title">LOTS OF VALUES</h2>
            <ul>
                <li class="led"><div>1</div></li>
                <li class="led"><div>2</div></li>
                <li class="led"><div>3</div></li>
                <li class="led"><div>4</div></li>
                <li class="led"><div>5</div></li>
                <li class="led"><div>6</div></li>
                <li class="led"><div>7</div></li>
                <li class="led"><div>8</div></li>
                <li class="led"><div>9</div></li>
                <li class="led"><div>10</div></li>
                <li class="led"><div>11</div></li>
                <li class="led"><div>12</div></li>
                <li class="led"><div>13</div></li>
                <li class="led"><div>14</div></li>
                <li class="led"><div>15</div></li>
                <li class="led"><div>16</div></li>
                <li class="led"><div>17</div></li>
                <li class="led"><div>18</div></li>
                <li class="led"><div>19</div></li>
                <li class="led"><div>20</div></li>
                <li class="led"><div>21</div></li>
                <li class="led"><div>22</div></li>
                <li class="led"><div>23</div></li>
                <li class="led"><div>24</div></li>
                <li class="led"><div>25</div></li>
                <li class="led"><div>26</div></li>
                <li class="led"><div>27</div></li>
                <li class="led"><div>28</div></li>
                <li class="led"><div>29</div></li>
                <li class="led"><div>30</div></li>
                <li class="led"><div>31</div></li>
                <li class="led"><div>32</div></li>
            </ul>
        </div>
        <div class="box little half">
        <h2 class="box-title">LOTS OF VALUES</h2>
            <ul>
                <li class="led"><div>1</div></li>
                <li class="led"><div>2</div></li>
                <li class="led"><div>3</div></li>
                <li class="led"><div>4</div></li>
                <li class="led"><div>5</div></li>
                <li class="led"><div>6</div></li>
                <li class="led"><div>7</div></li>
                <li class="led"><div>8</div></li>
                <li class="led"><div>9</div></li>
                <li class="led"><div>10</div></li>
                <li class="led"><div>11</div></li>
                <li class="led"><div>12</div></li>
                <li class="led"><div>13</div></li>
                <li class="led"><div>14</div></li>
                <li class="led"><div>15</div></li>
                <li class="led"><div>16</div></li>
                <li class="led"><div>17</div></li>
                <li class="led"><div>18</div></li>
                <li class="led"><div>19</div></li>
                <li class="led"><div>20</div></li>
                <li class="led"><div>21</div></li>
                <li class="led"><div>22</div></li>
                <li class="led"><div>23</div></li>
                <li class="led"><div>24</div></li>
                <li class="led"><div>25</div></li>
                <li class="led"><div>26</div></li>
                <li class="led"><div>27</div></li>
                <li class="led"><div>28</div></li>
                <li class="led"><div>29</div></li>
                <li class="led"><div>30</div></li>
                <li class="led"><div>31</div></li>
                <li class="led"><div>32</div></li>
            </ul>
        </div>
    </div>
    </div>
    );
  }
}
export default HC;
