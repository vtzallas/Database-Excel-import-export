<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('foititis', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('am');
            $table->string('email');
            $table->string('phone');
            $table->integer('afm');
            $table->string('amka');
            $table->date('imerominia_enarxis');
            $table->date('imerominia_lixis');
            $table->unsignedBigInteger('tmima_id');
            $table->unsignedBigInteger('gender_id');
            $table->unsignedBigInteger('foreas_id');
            $table->foreign('tmima_id')->references('tmima_id')->on('tmimas');
            $table->foreign('gender_id')->references('gender_id')->on('genders');
            $table->foreign('foreas_id')->references('foreas_id')->on('foreas');
            $table->timestamps();
        });
    }

   


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('foititis');
    }
};
