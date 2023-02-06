<script>
    import { onMount } from 'svelte';
  
    function getData() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ foo: 1, bar: 2 });
        }, 1000);
      });
    }
  
    let data;
  
    onMount(() => {
      getData().then(response => {
        data = response;
      })
    })
  </script>
  
  {#if data}
    <div>Foo: {data.foo}</div>
    <div>Bar: {data.bar}</div>
  {/if}