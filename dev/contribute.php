<?php the_content(); ?>

<form method="post" action="<?php echo $_SERVER["REQUEST_URI"]; ?>">
    <div style="text-align: left; padding-top: 10px;">
        <label for="tougao_authorname">昵称:*</label>
        <input type="text" size="40" value="" id="tougao_authorname" name="tougao_authorname" />
    </div>

    <div style="text-align: left; padding-top: 10px;">
        <label for="tougao_authoremail">E-Mail:*</label>
        <input type="text" size="40" value="" id="tougao_authoremail" name="tougao_authoremail" />
    </div>
                    
    <div style="text-align: left; padding-top: 10px;">
        <label for="tougao_authorblog">您的博客:</label>
        <input type="text" size="40" value="" id="tougao_authorblog" name="tougao_authorblog" />
    </div>

    <div style="text-align: left; padding-top: 10px;">
        <label for="tougao_title">文章标题:*</label>
        <input type="text" size="40" value="" id="tougao_title" name="tougao_title" />
    </div>

    <div style="text-align: left; padding-top: 10px;">
        <label for="tougaocategorg">分类:*</label>
        <?php wp_dropdown_categories('id=tougaocategorg&show_count=1&hierarchical=1'); ?>
    </div>
                    
    <div style="text-align: left; padding-top: 10px;">
        <label style="vertical-align:top" for="tougao_content">文章内容:*</label>
        <textarea rows="15" cols="55" id="tougao_content" name="tougao_content"></textarea>
    </div>
                    
    <br clear="all">
    <div style="text-align: center; padding-top: 10px;">
        <input type="hidden" value="send" name="tougao_form" />
        <input type="submit" value="提交" />
        <input type="reset" value="重填" />
    </div>
</form>
