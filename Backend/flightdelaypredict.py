import numpy as np
import pandas as pd 
import os
import pyspark
from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, IntegerType, StringType

from pyspark.sql.functions import round
from pyspark.ml.feature import StringIndexer
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.classification import DecisionTreeClassifier
from pyspark.ml.classification import LogisticRegression
from pyspark.ml.classification import LogisticRegressionModel
from pyspark.ml.evaluation import MulticlassClassificationEvaluator, BinaryClassificationEvaluator


def delay_predict():
    spark = SparkSession.builder \
                    .master('local[*]') \
                    .appName('ML with PySpark') \
                    .getOrCreate()

    flights_df = spark.read.csv('temp.csv',
                         sep=',',
                         header=True,
                         inferSchema=True,
                         nullValue='NA')

    flights_df = flights_df.dropna()

    flights_df.show()

    flights_km = flights_df.withColumn('km', round(flights_df.mile * 1.60934, 0)) \
                    .drop('mile')


    flights_indexed = StringIndexer(inputCol='carrier', outputCol='carrier_idx').fit(flights_km).transform(flights_km)


    flights_indexed = StringIndexer(inputCol='org', outputCol='org_idx').fit(flights_indexed).transform(flights_indexed)

    assembler = VectorAssembler(inputCols=['mon', 'dom', 'dow',
        'carrier_idx', 'org_idx', 'km', 'depart', 'duration'], outputCol='features')

    flights_assembled = assembler.transform(flights_indexed)

    flightmodelanalyse = LogisticRegressionModel.load("flightmodel")

    prediction = flightmodelanalyse.transform(flights_assembled)

    prediction.show()

    vallst = prediction.select('prediction').rdd.flatMap(lambda x: x).collect()

    finalval = ""

    if vallst[-1] == 0:
        finalval = "Your flight will be on time. Have a safe journey!!"
    elif vallst[-1] == 1:
        finalval = "There shall be a delay in the flight"
        

    # file = "temp.csv"
    # if(os.path.exists(file) and os.path.isfile(file)):
    #     os.remove(file)
    
    return finalval


val2 = delay_predict()
print(val2)
