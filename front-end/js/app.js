//Cargar todos los empleados
function cargar(){
    $.ajax({
        url: "http://localhost:3000/api/employees",
        method: 'get' ,
        dataType: 'json',
        success: function(rs){
            if(rs.code==200){
                $("#list").empty();
                $.each(rs.data, function(index, value) {
                 $("#list").append(
                    `<div id="item">
                        <img class="item-select" data-id="${value["_id"]}" src="http://placebeard.it/100/100">
                        <div>
                            <h3>${value["name"]}</h3>
                            <strong>${value["position"]}</strong>
                        </div>
                        <strong class='delete' data-id='${value["_id"]}'><span class="icon-bin"></span>Delete</strong>
                    </div>`
                 );
                 
                });
            }
            
        }
    });
    $(".form").css({display: "none"})
}

//Guardar un empleado
$("#save").click(function(){
    datos = $("#form").serialize();
    $.ajax({
        url: "http://localhost:3000/api/employees",
        method: "post" ,
        data: datos ,
        dataType: 'json' ,
        success: function(rs){
            if(rs.code==200){
                console.log(rs);
                cargar();
                $('#name').val('')
                $('#position').val('')
           
            }
            
        }
    });   
});

//Eliminar un empleado
$(document).on("click", ".delete", function(e){
    e.preventDefault();
    dato = $(this).data('id');
    console.log(dato)
    $.ajax({
        url: "http://localhost:3000/api/employee/"+dato,
        method: 'delete' ,
        dataType: 'json',
        success: function(rs){
            if(rs.code==200){
                cargar();
                $(".list-task").empty()
            }
            
        }
    });
});

//Listar las tareas de un empleado
$(document).on("click", ".item-select", function(e){
    var id = $(this).data("id");
    $("#save-task").data("id",id ) 
    $.ajax({
        url: "http://localhost:3000/api/employee/"+id,
        method: "get" ,
        dataType: 'json' ,
        success: function(rs){
            if(rs.code==200){
                getTask(rs.data);             

            }
            
        }
    }); 
    $(".item-select").parent().css({display:"none"})
    $(this).parent().css({display:"grid"})
    $(".form").toggle();

});

//Guardar tareas de un empleado
$("#save-task").click(function(){
    var datos = $(".form").serialize();
    var dato = $(this).data("id")
    $.ajax({
        url: "http://localhost:3000/api/employee/"+dato,
        method: "put" ,
        data: datos ,
        dataType: 'json' ,
        success: function(rs){
            if(rs.code==200){
                console.log(rs);
                getTask(rs.data);
                $('#task').val('')

            }
            
        }
    }); 
});

$("#home").click(function() {
    $(".item-select").parent().css({display:"grid"})
    $(".form").css({display:"none"})
})

 
function getTask(rs){
    $(".list-task").empty()
    $.each(rs.task, function (index, value) { 
        $(".list-task").append( `<li>
                                    <h2>${value}</h2>
                                    <strong data-id='${rs["_id"]}' data-task="${value}"} class="delete-task" ><span class="icon-bin"></span></strong>
                                </li>`
                                )
    });
    
}

$(document).on("click", ".delete-task", function(){
    var id = $(this).data("id")
    var datos ={task: $(this).data("task")}
    console.log(datos, id)
    $.ajax({
        url: "http://localhost:3000/api/task/"+id,
        method: "delete" ,
        data: datos ,
        dataType: 'json' ,
        success: function(rs){
            if(rs.code==200){
                console.log(rs);
                getTask(rs.data);

            }
            
        }
    }); 
});
cargar();
