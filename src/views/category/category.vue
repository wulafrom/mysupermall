<template>

  <div class="wrapper">

    <ul class="content">
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
    </ul>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "category",
    components: {
      BScroll
    },
    data() {
      return {
        scroll:null
      }
    },
    created() {

    },
    //dom元素挂载到vue之后调用
    mounted() {
      this.scroll = new BScroll('.wrapper',{
        click:true,
        probeType:2,
        pullUpLoad:true
      })
      this.scroll.on('scroll', (position)=>{
        //console.log(position);
      })
      this.scroll.on('pullingUp',(position)=>{
        console.log('上拉加载更多');
      })

    },
    methods:{
      btn(){

      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: #ff8198;

    /*overflow-y: scroll 自动有属性 overflow: hidden;*/
    /*overflow-y: scroll;*/
    overflow: hidden;
  }
</style>
