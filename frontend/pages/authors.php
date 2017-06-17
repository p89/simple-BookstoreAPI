<div class="row voffset5">
    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
        <form role="form" id="authorAdd">
            <legend>Add author</legend>

            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" name="name" id="authorNameAdd" placeholder="Name...">
            </div>
            <div class="form-group">
                <label for="surname">Surname</label>
                <input type="text" class="form-control" name="surname" id="authorSurnameAdd" placeholder="Surname...">
            </div>
            <button type="submit" class="btn btn-primary"><i class="fa fa-pencil"></i>&nbsp;Add</button>
        </form>
    </div>
    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
</div>
<div class="row voffset5">
    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
        <select name="authorEditSelect" id="authorEditSelect" class="form-control">
            <option value=""> -- Select Author for edit --</option>
        </select>
        <form role="form" id="authorEdit">
            <input type="hidden" name="id" id="editAuthorId" value="">
            <legend class="voffset2">Edit author</legend>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" name="name" id="editAuthorNameField" placeholder="Name...">
            </div>
            <div class="form-group">
                <label for="surname">Surname</label>
                <input type="text" class="form-control" name="surname" id="editAuthorSurnameField" placeholder="Surname...">
            </div>
            <button type="submit" class="btn btn-primary"><i class="fa fa-pencil"></i>&nbsp;Edit</button>
        </form>
    </div>
    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
</div>
<div class="row voffset5">
    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
        <div class="panel panel-primary">
            <div class="panel-heading">Authors list</div>
            <div class="panel-body">
                <ul class="list-group" id="authorsList">

                    <!-- list -->

                </ul>
            </div>
        </div>
    </div>
    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
</div>