<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
</head>

<body>
    <div class="container">
        @if (Session('message'))
        <h2 style="color:red">{{ Session('message') }}</h2>
        @endif
        <form action="{{ route('postInput') }}" method="POST" role="form">
            @csrf
            <legend>Reset</legend>

            <div class="form-group">
                <label for="">Nhập địa chỉ email</label>
                <input type="text" class="form-control" id="" name="txtEmail" placeholder="Input field">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</body>

</html>