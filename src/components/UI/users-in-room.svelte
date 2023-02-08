<script>
    export let names = []
</script>

<div class="users">
    <ul>
        {#each names as name}
            <li>{name}</li>
        {/each}
    </ul>
</div>

<style>
     ul {
        list-style: none;
    }
</style>