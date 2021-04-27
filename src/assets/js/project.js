// Master=> Loading
jQuery(function()
{
    $("#loading").fadeOut(function()
    {
        $("body").css("overflow","auto");           //show scroll
        $(this).remove();                           // display none
    });
    // // Master => Scroll Top
    var scrolltop=$("#scrolltop");
    $(window).on('scroll',function()
    {
        if($(this).scrollTop()>=300)
        {
            scrolltop.show();
        }
        else
        {
            scrolltop.hide();
        }
    });
    scrolltop.on('click',function()
    {
        $("html,body").animate({scrollTop:0},600);
    });
});
/*********************************************************************/
// Emoj
jQuery(function()
{
    for($i=128512;$i<=128567;$i++)
    {
        $('.emjContainer').append('<a class="emoji col-1">&#'+$i+';</a>');
    }
    $(".emoji").on('click',function()
    {
        $('#postContent').val($('#postContent').val() + $(this).html());
    });
});
$('#dropdownMenuLink').on('click',function()
{
    $('.emjContainer').toggle();
});
$('.dropdownOptions').on('click',function()
{
    var post_id=$(this).attr('data-post');
    $('#optionsContainer'+post_id).toggle();
});
$('.dropdownShares').on('click',function()
{
    var post_id=$(this).attr('data-post');
    $('#shareContainer'+post_id).toggle();
});


$('.dropdownNotOptions').on('click',function()
{
    var notf_id=$(this).attr('data-notf');
    $('#optionsNotContainer'+notf_id).toggle();
});
/*************************************************************/
// As read notification
$("[data-asreadnotff]").on('click',function(){
    $.ajax({
        type: "GET",
        url: $(this).data('asreadnotff'),
        success: function() {
        }
    })
});
/*************************************************************/
/*********************************************************************/
// Post Image
$('#iconImg').on('click',function()
{
    $('#postImg').click();
});
$('#postImg').on('change',function(event) {
    $('#imgContainer').removeClass('d-none');
    var output = document.getElementById('imgContainerimg');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function()
    {
            URL.revokeObjectURL(output.src) // free memory
    }
});
/*********************************************************************/
//Comments
$('[data-comment]').on('click',function(e)
{
    e.preventDefault();
    var post_id=$(this).data('comment');
    $('.commentsContainer'+post_id).toggle();
});
/*********************************************************************/
// Emoj Comments
$(document).ready(function()
{
    for($i=128512;$i<=128546;$i++)
    {
        $('.emojis').append('<a class="emojiComm col-1">&#'+$i+';</a>');
    }
    $('.dropdownMenuLinkComm').on('click',function()
    {
        var post_id=$(this).data('posting');
        $('.emjContainerComm'+post_id).toggle();
    });
    $(".emojiComm").on('click',function()
    {
        var post_id=$(this).closest('.emojis').data('postin');
        $('#commentContent'+post_id).val($('#commentContent'+post_id).val() + $(this).html());
    });
});
/*********************************************************************/
// Store Comment
$('.sendPostComment').on('submit',function (e)
{
    e.preventDefault();
    var data = $(this).serialize();
    var url = $(this).attr('action');
    var method = $(this).attr('method');
    var post_id=$(this).data('info');
    $.ajax({
        url: url,
        dataType: 'json',
        data: data,
        type: method,
        success:function (data)
        {
            var tr="<div class='post-heading' style='height: 60px;padding: 2px;'>"+
                "<div class='float-right image'>"+
                "<img src="+data.img+" class='img-circle avatar' alt='user profile image' style='width: 30px; height: 30px;'>"+
                "</div><div class='float-right meta'> <div class='title h5' style='margin: 10px;font-size: 12px;'>"+
                "<a href='#'><b>"+data.name+"</b></a></div>"+
                "<h6 class='text-muted time' style='font-size: 10px;'>"+data.created_at+"</h6></div>"+
                "<div class='float-left meta'><a href='#'><i class='fa fa-trash-alt text-danger'></i></a>"+
                "</div></div><div class='post-description col-sm-10 text-right'style='padding-top: 0;padding-bottom: 1px;'>"+
                "<p>"+data.content+"</p></div><hr style='border-top: 1px solid #ddcd80;'>";
            $('.comos'+post_id).append(tr);
            /****/
            // count
            var count=$('.commentsNewCount'+post_id).val();
            var newCount=parseInt(count) +1;
            $('.commentsNewCount'+post_id).val(newCount);
            $('.commentsCount'+post_id).text('( '+newCount+' )');
        }
    });
    $(this).trigger('reset');   // to empty inputs
});
/*********************************************************************/
// delete action with reload
$("[data-delete]").on('click',function(e){
    e.preventDefault();
    var url=$(this).data('delete');
    Swal.fire({
        title:"هل أنت متأكد ؟",
        text:"لن تتمكن من التراجع عن هذا!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText:"نعم ، احذفها!",
        cancelButtonText:"تراجع"
    }).then(function(e){
        if(e.value == true){
           window.location.href = url;
        }
    });
});
/*********************************************************************/
// delete action without reload
$("[data-deleteaj]").on('click',function(e){
    e.preventDefault();
    var url=$(this).data('deleteaj');
    var post=$(this).closest('.postContainer');
    Swal.fire({
        title:"هل أنت متأكد ؟",
        text:"لن تتمكن من التراجع عن هذا!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText:"نعم ، احذفها!",
        cancelButtonText:"تراجع"
    }).then(function(e){
        if (e.value == true) {
            $.ajax({
                type: "GET",
                url: url,
                success: function() {
                    post.remove();
                    Swal.fire(
                        'تم !',
                        'تم حذف المنشور بنجاح .',
                        'success'
                    );
                }
            })
        }
    });
});
/*********************************************************************/
// delete comment
$("[data-deletecomment]").on('click',function(e){
    e.preventDefault();
    var url=$(this).data('deletecomment');
    var comment=$(this).closest('.commentContainer');
    Swal.fire({
        title:"هل أنت متأكد ؟",
        text:"لن تتمكن من التراجع عن هذا!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText:"نعم ، احذفها!",
        cancelButtonText:"تراجع"
    }).then(function(e){
        if (e.value == true) {
            $.ajax({
                type: "GET",
                url: url,
                success: function() {
                    comment.remove();
                }
            })
        }
    });
});

/*********************************************************************/
// post like
$("[data-like]").on('click',function(e){
    e.preventDefault();
    var post_id=$(this).attr("data-like");
    $.ajax({
        type: "GET",
        url: $(this).attr('href'),
        success: function(data) {
            if(data.status == 'liked')
            {
                $('#postLikeIcon'+post_id).addClass('postdislike').removeClass('postlike');
                // count
                var count=$('.likesNewCount'+post_id).val();
                var newCount=parseInt(count) +1;
                $('.likesNewCount'+post_id).val(newCount);
                $('.likesCount'+post_id).text('( '+newCount+' )');
            }
            else
            {
                $('#postLikeIcon'+post_id).addClass('postlike').removeClass('postdislike');
                // count
                var count=$('.likesNewCount'+post_id).val();
                var newCount=parseInt(count) -1;
                $('.likesNewCount'+post_id).val(newCount);
                $('.likesCount'+post_id).text('( '+newCount+' )');
            }
        }
    })
});
/*********************************************************************/
/***********/ // Notices /***********/
// store album notice
$('.sendPostReport').on('click',function ()
{
    var post_id=$(this).attr("data-id");
    var url=$(this).attr('data-postNotice');
    var text=$(this).attr('data-text');
    $('#formModalPost').attr('action',url);
    $('#examplePostModal').addClass('examplePostModal'+post_id);
    $('#examplePostModal h3').text(text);
});
// store comment notice
$('.sendCommentReport').on('click',function ()
{
    var comment_id=$(this).attr("data-id");
    var url=$(this).attr('data-commentNotice');
    var text=$(this).attr('data-text');
    $('#formModalPost').attr('action',url);
    $('#examplePostModal').addClass('examplePostModal'+comment_id);
    $('#examplePostModal h3').text(text);
});
// store user notice
$('.sendUserReport').on('click',function ()
{
    var user_id=$(this).attr("data-id");
    var url=$(this).attr('data-userNotice');
    var text=$(this).attr('data-text');
    $('#formModalPost').attr('action',url);
    $('#examplePostModal').addClass('examplePostModal'+user_id);
    $('#examplePostModal h3').text(text);
});
// store offer notice
$('.sendOfferReport').on('click',function ()
{
    var offer_id=$(this).attr("data-id");
    var url=$(this).attr('data-offerNotice');
    var text=$(this).attr('data-text');
    $('#formModalPost').attr('action',url);
    $('#examplePostModal').addClass('examplePostModal'+offer_id);
    $('#examplePostModal h3').text(text);
});
/*************************************************************/
// need
$(".takeOffer").on('click',function(e){
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: $(this).attr('href'),
        success: function(data) {
            if(data.status == 'done')
            {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'تم حجز العرض بنجاح',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else
            {
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'لقد قمت بحجز هذا العرض من قبل',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    })
});
$(".removeNeed").on('click',function(e){
    e.preventDefault();
    var con=$(this).closest('.needConto');
    $.ajax({
        type: "GET",
        url: $(this).attr('href'),
        success: function() {
            con.remove();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'تم الغاء حجز العرض بنجاح',
                showConfirmButton: false,
                timer: 1500
            });
        }
    })
});
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/
/*********************************************************************/

