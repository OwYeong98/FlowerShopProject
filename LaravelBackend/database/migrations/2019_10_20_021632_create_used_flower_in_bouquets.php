<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsedFlowerInBouquets extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('used_flower_in_bouquets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('bouquetid');
            $table->unsignedBigInteger('flowerid');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('used_flower_in_bouquets');
    }
}
