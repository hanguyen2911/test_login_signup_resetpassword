<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Mail\SendMail;
use Illuminate\Support\Str;

class AccountController extends Controller
{
    private $status = 200;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $account = Account::all();
        if (count($account) > 0) {
            return response()->json(["status" => $this->status, "success" => true, "count" => count($account), "data" => $account]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "whoop? no record found"]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function show(Account $account)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function edit(Account $account)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Account $account)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Account  $account
     * @return \Illuminate\Http\Response
     */
    public function destroy(Account $account)
    {
        //
    }

    function onLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(["errors" => $validator->getMessageBag(), "success" => 0]);
        }

        $user = Account::where("email", $request->email)->get();
        if ($user->count() > 0) {
            if ($user[0]->password == $request->password) {
                return Response()->json(["success" => 1, 'user' => $user[0]]);
            }
        }
        return response()->json(['errors' => ['login' => "Login profile does not exist!!"]]);
    }
    function onRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'phone' => 'required|numeric',
            'username' => 'required|string',
            'address' => 'required|string',
            'password' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json(["errors" => $validator->getMessageBag(), "success" => 0]);
        }
        $find = Account::where('email', $request->email)->get();
        if ($find->count() > 0) {
            return response()->json(["errors" => ['register' => 'Account already exists!']]);
        }
        $new = new Account;
        $new->email = $request->email;
        $new->password = $request->password;
        $new->phone = $request->phone;
        $new->username = $request->username;
        $new->address = $request->address;
        $new->save();
        return response()->json(["success" => 1]);
    }

    function onForgot(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email'
        ]);
        if ($validator->fails()) {
            return response()->json(["errors" => $validator->getMessageBag(), "success" => 0]);
        }
        $find = Account::where('email', $request->email)->get();
        if ($find->count() == 0) {
            return response()->json(["errors" => ['message' => 'Account does not exists!']]);
        }

        $hashed_random_password = Str::random(12);
        $details = [
            'title'=>'Password forgot',
            'password'=>$hashed_random_password
        ];
        $update=Account::where('email', $request->email)->first();
        $update->password=$hashed_random_password;
        $update->save();
        \Mail::to($request->email)->send(new SendMail($details));
        return response()->json(["success"=>1]);
    }


}
