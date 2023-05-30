<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::latest()->get();

        return Inertia::render('Post/Index', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Post/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostRequest $request)
    {
        Post::create(
            $request->validated()
        );

        return Redirect::route('posts.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        return Inertia::render('Post/Edit', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'description' => $post->description
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StorePostRequest $request, Post $post)
    {
        $post->update($request->validated());

        return Redirect::route('posts.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return Redirect::route('posts.index');
    }

    public function table(Request $request){
        $search = "";
        $sort = "";
        $sortBy="";
        $sortOrder="";
        if($request->input('search')){
            $search = $request->input('search');
            error_log($search);
        }
        if($request->input('sort')!='undefined'){
            $sort = $request->input('sort');
            error_log($request->input('sortBy'));
            // $sortBy = $request->input('sortBy');
            if($request->input('sortBy')=='ascend'){
                $sortBy = 'asc';
                $sortOrder = $request->input('sortBy');
            }else if($request->input('sortBy')=='descend'){
                error_log("waw");
                $sortBy = 'desc';
                $sortOrder = $request->input('sortBy');
            }
        }
     
        // $posts = Post::where('title','like','%'.$search. '%')->orderBy($sort)->paginate(1)->through(function ($post){
        //     return [
        //         'title' => $post->title,
        //         'description' => $post->description
        //     ];
        // });
        $posts = Post::where('title','like','%'.$search. '%');
        if($request->input('sort') && $request->input('sortBy')!='undefined' && $request->input('sortBy')!='false'){
            $posts=$posts->orderBy($sort,$sortBy);
        }
        $posts=$posts->paginate(1)->through(function ($post){
            return [
                'title' => $post->title,
                'description' => $post->description
            ];
        });
         
      if (request()->expectsJson()){
            return $posts;
        };

        return Inertia::render('Post/PostTable', ['posts' => $posts,'sort'=>$sort,'sortBy'=>$sortOrder,'search'=>$search]);
    }
}