<div c-class='{"loading": loading}'>
  <div class="pic_list">
    <cube-slider
      list="{{picList}}"
      autoplay="{{false}}"
      width="368"
      height="155">
    </cube-slider>
  </div>
  
  <div class="text_list">
    <p class='tit'>
      更多故事分类
    </p>
    <ul class="list">
      {{#list textList as item by item_index}}
        <li class="item">
          <a href="{{item.link}}">{{item.name}}</a>
        </li>
      {{/list}}
    </ul>
  </div>
</div>