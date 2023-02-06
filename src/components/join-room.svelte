
<script>

    import SocketPiano from "./piano/socket-piano.svelte";
    import io from 'socket.io-client'
    

    let joined = false
    let name = '' ;
    let id = '';
</script>

<div>
    {#if !joined}
    <h2>Join Room</h2>
    <form>
        <input type="text" id="name" class="name" placeholder="Name" value='' required/>
        <input type="text" id="roomId" class="room-id" placeholder="Room ID" value='' required />
        
        <p on:click={() => {
            console.log('hi')
            name = document.getElementById('name').value
            id = document.getElementById('roomId').value
            
            joined = true;

        }}>Join Room</p>
    </form>
    {:else} 
        <SocketPiano name={name} id={id} />
    {/if}
    
</div>

<style>
form {
        background-color: rgb(27, 27, 27);
        color: white;
        width: 70%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border-radius: 20px;
        padding: 20px;

    }
     .options {
        margin: 0 auto;
     }

    h2 {
        text-align: center;
    }

    form p {
        width: 40%;
        text-align: center;
        padding: 20px;
        border: 1px solid white;
        margin: 0 auto;
        margin-top: 20px;
        border-radius: 20px;
    }
</style>