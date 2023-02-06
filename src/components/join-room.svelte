
<script>

    import SocketPiano from "./piano/socket-piano.svelte";
    import io from 'socket.io-client'
    //component to show a form to allow users to put in their name and id and enter them to show the socket-piano component

    let joined = false
    let name = '' ;
    let id = '';
</script>

<div>
    {#if !joined}
    <div class="join">
    <h2>Join Room</h2>
        <form>
            <div class="input-wrapper">
                <input type="text" id="name" class="name" placeholder="Name" value='' required/>
                <input type="text" id="roomId" class="room-id" placeholder="Room ID" value='' required />
            </div>
            <p on:click={() => {
                name = document.getElementById('name').value
                id = document.getElementById('roomId').value
                
                joined = true;

            }}>Join Room</p>
        </form>
    </div>
    {:else} 
        <SocketPiano name={name} id={id} />
    {/if}
    
</div>

<style>
.join{
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

    .input-wrapper {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 40px;
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

    input {
        width: 50%;
        height: 50px;
        margin: 0 auto;
        border-radius: 20px;
        padding-left: 20px;
    }
</style>