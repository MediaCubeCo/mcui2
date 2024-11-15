import{_ as t}from"./McStack-BMuLqMTl.js";import{_ as o}from"./McChip-DqO1iODX.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./Spaces-DiQ1o4ZA.js";import"./McSvgIcon-Cq4_nq1C.js";import"./Sizes-ByFfI8jG.js";import"./Colors-CDVZRUyv.js";const i=[{id:2,title:"Autos",youtube_id:"2",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:3,title:"Music",youtube_id:"10",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:14,title:"Howto",youtube_id:"26",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:7,title:"Travel",youtube_id:"19",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:1,title:"Film",youtube_id:"1",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:4,title:"Pets",youtube_id:"15",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:12,title:"Entertainment",youtube_id:"24",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:32,title:"Nonprofits",youtube_id:"29",created_at:"2017-09-27T14:52:42+03:00",updated_at:"2019-06-04T20:20:06+03:00"},{id:5,title:"Sports",youtube_id:"17",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:8,title:"Gaming",youtube_id:"20",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:10,title:"People",youtube_id:"22",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:11,title:"Comedy",youtube_id:"23",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:13,title:"News",youtube_id:"25",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:15,title:"Education",youtube_id:"27",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"},{id:16,title:"Science",youtube_id:"28",created_at:"2017-09-27T14:52:00+03:00",updated_at:"2019-06-04T20:20:08+03:00"}],x={title:"McStack",component:t,tags:["autodocs"],argTypes:{visibleCount:{control:"number"},collapsed:{control:"boolean"}},args:{visibleCount:1/0,collapsed:!1},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},e={render(){return{components:{McStack:t,McChip:o},computed:{computedCategories(){return i}},template:`
        <mc-stack>
            <mc-chip v-for="category in computedCategories" :key="category.id" variation="purple" :title="category.title" />
        </mc-stack>
    `}}},a={render(){return{components:{McStack:t,McChip:o},computed:{computedCategories(){return i}},template:`
        <mc-stack collapsed>
            <mc-chip v-for="category in computedCategories" :key="category.id" variation="purple" :title="category.title" />
        </mc-stack>
    `}}},r={render(){return{components:{McStack:t,McChip:o},computed:{computedCategories(){return i}},template:`
        <mc-stack :visible-count="4">
            <mc-chip v-for="category in computedCategories" :key="category.id" variation="purple" :title="category.title" />
        </mc-stack>
    `}}},c={render(){return{components:{McStack:t,McChip:o},computed:{computedCategories(){return i}},template:`
        <mc-stack :visible-count="4" collapsed>
            <mc-chip v-for="category in computedCategories" :key="category.id" variation="purple" :title="category.title" />
        </mc-stack>
    `}}};var n,d,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McStack,
        McChip
      },
      computed: {
        computedCategories() {
          return categories;
        }
      },
      template: \`
        <mc-stack>
            <mc-chip v-for="category in computedCategories" :key="category.id" variation="purple" :title="category.title" />
        </mc-stack>
    \`
    };
  }
}`,...(p=(d=e.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var s,u,m;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McStack,
        McChip
      },
      computed: {
        computedCategories() {
          return categories;
        }
      },
      template: \`
        <mc-stack collapsed>
            <mc-chip v-for="category in computedCategories" :key="category.id" variation="purple" :title="category.title" />
        </mc-stack>
    \`
    };
  }
}`,...(m=(u=a.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var l,g,_;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McStack,
        McChip
      },
      computed: {
        computedCategories() {
          return categories;
        }
      },
      template: \`
        <mc-stack :visible-count="4">
            <mc-chip v-for="category in computedCategories" :key="category.id" variation="purple" :title="category.title" />
        </mc-stack>
    \`
    };
  }
}`,...(_=(g=r.parameters)==null?void 0:g.docs)==null?void 0:_.source}}};var y,k,T;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McStack,
        McChip
      },
      computed: {
        computedCategories() {
          return categories;
        }
      },
      template: \`
        <mc-stack :visible-count="4" collapsed>
            <mc-chip v-for="category in computedCategories" :key="category.id" variation="purple" :title="category.title" />
        </mc-stack>
    \`
    };
  }
}`,...(T=(k=c.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};const L=["Default","Collapsed","LimitMax4","LimitMax4PlusCollapsed"];export{a as Collapsed,e as Default,r as LimitMax4,c as LimitMax4PlusCollapsed,L as __namedExportsOrder,x as default};
